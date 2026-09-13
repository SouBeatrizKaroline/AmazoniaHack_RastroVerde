import React from 'react'
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  FileText,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DocumentInstrument, InstrumentConsistencyCheck } from '@/services/draftReportTypes'

interface InstrumentConsistencyViewerProps {
  instruments: DocumentInstrument[]
  checks: InstrumentConsistencyCheck[]
  onOpenInstrument?: (inst: DocumentInstrument) => void
}

export const InstrumentConsistencyViewer: React.FC<InstrumentConsistencyViewerProps> = ({
  instruments,
  checks,
  onOpenInstrument,
}) => {
  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#143028]">
              Cadeia Documental e Consistência entre Instrumentos
            </h3>
            <p className="text-xs text-[#5B6B63]">
              Acompanhamento de congruência entre Auto de Constatação → Auto de Infração → Termo de
              Embargo → Relatório de Fiscalização.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Instruments in Workflow Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {instruments.map((inst, idx) => (
          <div
            key={inst.id}
            className="rounded-3xl border border-[#E2E8E4] bg-white p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-[#1B5E3A] transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md">
                  Passo {idx + 1}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    inst.status === 'Lavrado'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {inst.status}
                </span>
              </div>

              <h4 className="font-bold text-sm text-[#143028]">{inst.type}</h4>
              <div className="text-xs text-[#5B6B63] space-y-1">
                <div>
                  <span className="font-semibold text-[#143028]">Número: </span>
                  <span className="font-mono text-[#1B5E3A] font-bold">{inst.number}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#143028]">Data: </span>
                  {inst.date}
                </div>
                <div>
                  <span className="font-semibold text-[#143028]">Área citada: </span>
                  {inst.area}
                </div>
                {inst.citedPreviousInstrumentNumber && (
                  <div className="p-1.5 rounded-lg bg-[#F7F9F8] border border-[#E2E8E4] text-[11px]">
                    <span className="text-[#5B6B63]">Cita anterior: </span>
                    <strong className="text-[#143028]">
                      Auto nº {inst.citedPreviousInstrumentNumber}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            {inst.consistencyNotes && (
              <div
                className={`p-2.5 rounded-xl text-[11px] leading-tight ${
                  inst.consistencyNotes.includes('ALERTA')
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 font-semibold'
                    : 'bg-[#F7F9F8] text-[#5B6B63]'
                }`}
              >
                {inst.consistencyNotes}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Side-by-Side Consistency Verification Matrix */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
        <div>
          <h4 className="text-sm font-bold text-[#143028] flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#1B5E3A]" />
            <span>Matriz Comparativa Lado a Lado (4 Instrumentos)</span>
          </h4>
          <p className="text-xs text-[#5B6B63] mt-0.5">
            Verificação automatizada de divergências em números, datas, áreas e partes citadas ao
            longo do processo.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8E4] bg-[#F7F9F8] text-[#5B6B63]">
                <th className="py-2.5 px-3 rounded-l-xl">Parâmetro Avaliado</th>
                <th className="py-2.5 px-3">Auto Constatação</th>
                <th className="py-2.5 px-3">Auto Infração</th>
                <th className="py-2.5 px-3">Termo Embargo</th>
                <th className="py-2.5 px-3">Relatório Minuta</th>
                <th className="py-2.5 px-3 text-right rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8E4]">
              {checks.map((chk, i) => (
                <tr
                  key={i}
                  className={`hover:bg-[#F9FCFA] transition-colors ${
                    chk.status === 'Divergência' ? 'bg-amber-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-[#143028] align-top">
                    {chk.label}
                    {chk.divergenceAlert && (
                      <div className="text-[11px] text-amber-900 font-normal mt-1 flex items-start gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{chk.divergenceAlert}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 align-top font-mono text-[#5B6B63]">
                    {chk.constatacaoValue}
                  </td>
                  <td className="py-3 px-3 align-top font-mono text-[#5B6B63]">
                    {chk.infracaoValue}
                  </td>
                  <td className="py-3 px-3 align-top font-mono text-[#5B6B63]">
                    {chk.embargoValue}
                  </td>
                  <td className="py-3 px-3 align-top font-mono text-[#143028] font-medium">
                    {chk.relatorioValue}
                  </td>
                  <td className="py-3 px-3 align-top text-right">
                    {chk.status === 'Consistente' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        <span>Consistente</span>
                      </span>
                    ) : chk.status === 'Divergência' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3 text-amber-700" />
                        <span>Divergência</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3 text-red-700" />
                        <span>Ausente</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default InstrumentConsistencyViewer
