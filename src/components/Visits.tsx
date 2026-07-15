import React, { useState } from 'react';
import { Visit, Integrado } from '../types';
import { getExpectedConsumption } from '../data';
import { Search, ArrowUpDown, Download, Plus, Eye, X } from 'lucide-react';

interface VisitsListProps {
  visits: Visit[];
  integrados: Integrado[];
  onEditVisit: (id: string) => void;
  onDeleteVisit: (id: string) => void;
  onNewVisit?: () => void;
  onNewLote?: () => void;
  onExport?: (data?: Visit[]) => void;
}

type SortOption = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc' | 'idade-desc' | 'idade-asc';

export function VisitsList({ visits, integrados, onEditVisit, onDeleteVisit, onNewVisit, onNewLote, onExport }: VisitsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedIntegradoDetails, setSelectedIntegradoDetails] = useState<string | null>(null);

  const getIntegradoName = (integradoId: string) => {
    return integrados.find(i => i.id === integradoId)?.name || '';
  };

  const sortedVisits = [...visits].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'name-asc':
        return getIntegradoName(a.integradoId).localeCompare(getIntegradoName(b.integradoId));
      case 'name-desc':
        return getIntegradoName(b.integradoId).localeCompare(getIntegradoName(a.integradoId));
      case 'idade-desc':
        return b.idade - a.idade;
      case 'idade-asc':
        return a.idade - b.idade;
      default:
        return 0;
    }
  });

  const filteredVisits = sortedVisits.filter(v => {
    const integrado = integrados.find(i => i.id === v.integradoId);
    return integrado?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           v.recomendacao.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
         <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded flex-1 sm:flex-none">
           <ArrowUpDown className="w-4 h-4" />
           <select 
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value as SortOption)}
             className="bg-transparent outline-none cursor-pointer text-slate-700 w-full"
           >
             <option value="date-desc">Data (Mais recentes)</option>
             <option value="date-asc">Data (Mais antigas)</option>
             <option value="name-asc">Nome (A-Z)</option>
             <option value="name-desc">Nome (Z-A)</option>
             <option value="idade-desc">Idade (Maior)</option>
             <option value="idade-asc">Idade (Menor)</option>
           </select>
         </div>
         <div className="relative w-full sm:max-w-md flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input 
             type="text" 
             placeholder="Buscar por cliente ou recomendação..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
           />
         </div>
         <div className="flex gap-2 w-full sm:w-auto">
            {onExport && (
              <button 
                onClick={() => onExport && onExport(filteredVisits)} 
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">Exportar</span>
              </button>
            )}
            {onNewLote && (
              <button onClick={onNewLote} className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-emerald-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Novo Lote</span>
              </button>
            )}
            {onNewVisit && (
              <button onClick={onNewVisit} className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-slate-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-slate-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Novo Lançamento</span>
              </button>
            )}
         </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
        <div className="overflow-auto max-h-[calc(100vh-180px)]">
        <table className="w-full text-left text-xs text-slate-600 min-w-[3000px] relative">
          <thead className="bg-slate-50 text-slate-700 font-semibold text-xs sticky top-0 z-20 shadow-sm">
            <tr>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Data</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Integrado</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Alojamento</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Tipo Lote</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Idade</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Animais Alojados</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Animais Mortos</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Vol. Cargas (kg)</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Recomendação</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Consumo acumulado</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Comedouro</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Colaborador</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Meta Aloj</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Cons. Aloj</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Meta Cresc 1</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Cons. Cresc 1</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Meta Cresc 2</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Cons. Cresc 2</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Meta Cresc 3</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Cons. Cresc 3</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Meta Term 1</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Cons. Term 1</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Meta Term 2</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Cons. Term 2</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Meta Acum.</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Peso aloj</th>
                <th className="px-2 py-2 border-b border-slate-200 whitespace-nowrap">Pontuação Sanitária</th>
                <th className="px-2 py-2 border-b border-slate-200 w-[60px] sticky right-0 top-0 bg-slate-50 z-30 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVisits.length === 0 ? (
                <tr>
                  <td colSpan={27} className="px-5 py-8 text-center text-slate-500">Nenhuma visita encontrada.</td>
                </tr>
              ) : filteredVisits.map((v) => {
                const integrado = integrados.find(i => i.id === v.integradoId);
                const expected = getExpectedConsumption(v.idade, v.tipoLote, v.pesoAloj);

                return (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-2 py-2 whitespace-nowrap">{
                      new Date(Number(v.date.split('-')[0]), Number(v.date.split('-')[1]) - 1, Number(v.date.split('-')[2])).toLocaleDateString('pt-BR')
                    }</td>
                    <td className="px-2 py-2 font-medium text-slate-800">{integrado?.name || 'Desconhecido'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-slate-600">{integrado?.alojamentoDate ? new Date(Number(integrado.alojamentoDate.split('-')[0]), Number(integrado.alojamentoDate.split('-')[1]) - 1, Number(integrado.alojamentoDate.split('-')[2])).toLocaleDateString('pt-BR') : '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">{v.tipoLote || 'Misto'}</span></td>
                    <td className="px-2 py-2 whitespace-nowrap">{v.idade}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{v.animaisAlojados ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{v.animaisMortos ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{v.volumeTotalCargas ?? '-'}</td>
                    <td className="px-2 py-2">
                      <div className="text-xs leading-relaxed min-w-[300px] whitespace-pre-wrap" title={v.recomendacao}>
                        {v.recomendacao ? (
                          <div className="space-y-1">
                            {v.recomendacao.split('\n').filter(l => l.trim()).map((line, i) => (
                              <div key={i}>{line.replace(/^[-\*]\s*/, '').trim()}</div>
                            ))}
                          </div>
                        ) : '-'}
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap font-semibold">{v.consumoAcumuladoReal ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.comedouro || '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.colaborador ? v.colaborador.replace(/\s*,\s*/g, ' / ') : '-'}</td>
                    
                    {/* Metas e Consumos */}
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.metaAlojamento ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.consumoAlojamento ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.metaCrescimento1 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.consumoCrescimento1 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.metaCrescimento2 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.consumoCrescimento2 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.metaCrescimento3 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.consumoCrescimento3 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.metaTerminacao1 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.consumoTerminacao1 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.metaTerminacao2 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.consumoTerminacao2 ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs font-semibold">{v.metaAcumulada ?? '-'}</td>
                    
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.pesoAloj ?? '-'}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs">{v.pontuacaoSanitaria ?? '-'}</td>
                    
                    <td className="px-2 py-2 whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10 w-[60px]">
                      <div className="flex flex-col gap-1 items-center">
                        <button
                          onClick={() => setSelectedIntegradoDetails(v.integradoId)}
                          className="text-slate-600 hover:text-slate-900 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-100 transition-colors w-full text-center"
                          title="Ver Detalhes do Lote"
                        >
                          Detalhes
                        </button>
                        <button 
                          onClick={() => {
                            setDeleteConfirmId(null);
                            onEditVisit(v.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold px-2 py-1 rounded hover:bg-blue-50 transition-colors w-full text-center"
                        >
                          Editar
                        </button>
                        {deleteConfirmId === v.id ? (
                          <div className="flex items-center justify-center gap-1 w-full">
                            <button 
                              onClick={() => {
                                onDeleteVisit(v.id);
                                setDeleteConfirmId(null);
                              }}
                              className="text-white bg-red-500 hover:bg-red-600 text-[10px] font-bold px-2 py-1 rounded transition-colors flex-1"
                            >
                              Sim
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-slate-600 bg-slate-200 hover:bg-slate-300 text-[10px] font-bold px-2 py-1 rounded transition-colors flex-1"
                            >
                              Não
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirmId(v.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors w-full text-center"
                          >
                            Apagar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedIntegradoDetails && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">
                Detalhes do Lote: {getIntegradoName(selectedIntegradoDetails)}
              </h3>
              <button 
                onClick={() => setSelectedIntegradoDetails(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Status</div>
                  <div className="text-sm font-medium text-slate-700">
                    {integrados.find(i => i.id === selectedIntegradoDetails)?.status || 'Desconhecido'}
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Total de Visitas</div>
                  <div className="text-sm font-medium text-slate-700">
                    {visits.filter(v => v.integradoId === selectedIntegradoDetails).length}
                  </div>
                </div>
              </div>
              
              {(() => {
                const loteVisits = visits.filter(v => v.integradoId === selectedIntegradoDetails)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                const latestVisit = loteVisits.length > 0 ? loteVisits[0] : null;
                const phases = [
                  { id: 'Alojamento', label: 'Alojamento', metaKey: 'metaAlojamento', consKey: 'consumoAlojamento' },
                  { id: 'Crescimento1', label: 'Crescimento 1', metaKey: 'metaCrescimento1', consKey: 'consumoCrescimento1' },
                  { id: 'Crescimento2', label: 'Crescimento 2', metaKey: 'metaCrescimento2', consKey: 'consumoCrescimento2' },
                  { id: 'Crescimento3', label: 'Crescimento 3', metaKey: 'metaCrescimento3', consKey: 'consumoCrescimento3' },
                  { id: 'Terminacao1', label: 'Terminação 1', metaKey: 'metaTerminacao1', consKey: 'consumoTerminacao1' },
                  { id: 'Terminacao2', label: 'Terminação 2', metaKey: 'metaTerminacao2', consKey: 'consumoTerminacao2' },
                ];
                
                return (
                  <>
                    {latestVisit && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Consumo por Fase (Última Visita)</h4>
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500">
                              <tr>
                                <th className="px-4 py-2 font-medium">Fase</th>
                                <th className="px-4 py-2 font-medium">Meta (kg)</th>
                                <th className="px-4 py-2 font-medium">Consumo (kg)</th>
                                <th className="px-4 py-2 font-medium">Desvio (kg)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {phases.map(phase => {
                                const meta = (latestVisit as any)[phase.metaKey];
                                const cons = (latestVisit as any)[phase.consKey];
                                const diff = (cons && meta) ? Number((cons - meta).toFixed(2)) : null;
                                return (
                                  <tr key={phase.id}>
                                    <td className="px-4 py-2 text-slate-700">{phase.label}</td>
                                    <td className="px-4 py-2 text-slate-600">{meta ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff !== null && Math.abs(diff) <= 1 ? 'text-blue-600' : diff !== null && diff > 1 ? 'text-red-600' : diff !== null && diff < -1 ? 'text-green-600' : 'text-slate-600'}`}>{cons ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff !== null && Math.abs(diff) <= 1 ? 'text-blue-600' : diff !== null && diff > 1 ? 'text-red-600' : diff !== null && diff < -1 ? 'text-green-600' : 'text-slate-600'}`}>
                                      {diff !== null ? (diff > 0 ? `+${diff}` : diff) : '-'}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Histórico de Visitas</h4>
                  </>
                );
              })()}
              <div className="space-y-3">
                {visits.filter(v => v.integradoId === selectedIntegradoDetails)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((visit) => (
                    <div key={visit.id} className="border border-slate-100 rounded-lg p-4 hover:border-slate-200 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-slate-800">
                          {new Date(Number(visit.date.split('-')[0]), Number(visit.date.split('-')[1]) - 1, Number(visit.date.split('-')[2])).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          Idade: {visit.idade} dias
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        {(() => {
                          const consumoReal = visit.consumoAcumuladoReal;
                          const consumoEsperado = getExpectedConsumption(visit.idade, visit.tipoLote, visit.pesoAloj);
                          const diffAcumulado = (consumoReal && consumoEsperado) ? Number((consumoReal - consumoEsperado).toFixed(2)) : null;
                          return (
                            <>
                              <div>
                                <span className="text-slate-500 mr-1">Consumo Real:</span>
                                <span className={`font-semibold ${diffAcumulado !== null && Math.abs(diffAcumulado) <= 1 ? 'text-blue-600' : diffAcumulado !== null && diffAcumulado > 1 ? 'text-red-600' : diffAcumulado !== null && diffAcumulado < -1 ? 'text-green-600' : 'text-slate-700'}`}>
                                  {consumoReal ?? '-'} kg
                                  {diffAcumulado !== null && (
                                    <span className="text-xs ml-1 opacity-80">
                                      ({diffAcumulado > 0 ? `+${diffAcumulado}` : diffAcumulado})
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 mr-1">Consumo Esperado:</span>
                                <span className="font-semibold text-slate-700">{consumoEsperado} kg</span>
                              </div>
                            </>
                          );
                        })()}
                        <div>
                          <span className="text-slate-500 mr-1">Animais Alojados:</span>
                          <span className="font-medium text-slate-700">{visit.animaisAlojados ?? '-'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 mr-1">Mortalidade:</span>
                          <span className="font-medium text-slate-700">{visit.animaisMortos ?? '-'}</span>
                        </div>
                      </div>
                      
                      {visit.recomendacao && (
                        <div className="bg-amber-50 text-amber-800 p-3 rounded text-xs leading-relaxed border border-amber-100/50">
                          <strong>Recomendação:</strong><br />
                          {visit.recomendacao}
                        </div>
                      )}
                    </div>
                ))}
                {visits.filter(v => v.integradoId === selectedIntegradoDetails).length === 0 && (
                  <div className="text-sm text-slate-500 text-center py-4">Nenhuma visita registrada.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
