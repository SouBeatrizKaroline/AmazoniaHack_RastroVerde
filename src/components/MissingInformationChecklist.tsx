import React from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ListTodo,
  Printer,
  PhoneCall,
  Smartphone,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MissingInformationItem } from '@/services/draftReportTypes'

interface MissingInformationChecklistProps {
  items: MissingInformationItem[]
  onToggleItem?: (id: string) => void
  onGenerateChecklist?: () => void
}

export const MissingInformationChecklist: React.FC<MissingInformationChecklistProps> = ({
  items,
  onToggleItem,
  onGenerateChecklist,
}) => {
  const criticalItems = items.filter((i) => i.category === 'crítico')
  const importantItems = items.filter((i) => i.category === 'importante')

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Alert Header Banner */}
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50/50 p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#143028]">
                O que falta para fechar o caso com defensabilidade técnica?
              </h3>
              <p className="text-xs text-amber-950/80 mt-0.5">
                Orientação operacional: se a equipe ainda estiver em campo, estes dados podem ser
                coletados antes do encerramento da ocorrência.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              size="sm"
              onClick={handlePrint}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-9 px-4 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>Gerar checklist de pendências (Mobile / PDF)</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Critical Gaps Section */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-red-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span>Pendências Críticas (Impedem a Homologação do Auto)</span>
          </h4>
          <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
            {criticalItems.length} itens pendentes
          </span>
        </div>

        <div className="space-y-3">
          {criticalItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-red-200 bg-red-50/30 space-y-2 hover:border-red-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-[#143028] flex items-center gap-1.5">
                    <span className="text-red-600 font-bold">⚠</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#5B6B63]">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={item.resolved}
                  onChange={() => onToggleItem?.(item.id)}
                  className="w-4 h-4 rounded text-[#1B5E3A] focus:ring-[#1B5E3A] accent-[#1B5E3A] mt-1 shrink-0"
                />
              </div>

              <div className="pt-2 border-t border-red-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-white border border-red-100">
                  <span className="font-bold text-red-800 text-[11px] block">
                    Impacto no Relatório:
                  </span>
                  <span className="text-[#5B6B63] text-[11px]">{item.impactOnReport}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-200/50">
                  <span className="font-bold text-[#1B5E3A] text-[11px] block">
                    Ação Recomendada em Campo:
                  </span>
                  <span className="text-[#143028] text-[11px]">{item.fieldGuidance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Gaps Section */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Pendências Importantes (Reforço Probatório)</span>
          </h4>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
            {importantItems.length} itens sugeridos
          </span>
        </div>

        <div className="space-y-3">
          {importantItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-amber-200 bg-amber-50/20 space-y-2 hover:border-amber-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-[#143028] flex items-center gap-1.5">
                    <span className="text-amber-600 font-bold">⚠</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#5B6B63]">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={item.resolved}
                  onChange={() => onToggleItem?.(item.id)}
                  className="w-4 h-4 rounded text-[#1B5E3A] focus:ring-[#1B5E3A] accent-[#1B5E3A] mt-1 shrink-0"
                />
              </div>

              <div className="pt-2 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-white border border-amber-100">
                  <span className="font-bold text-amber-800 text-[11px] block">
                    Impacto na Minuta:
                  </span>
                  <span className="text-[#5B6B63] text-[11px]">{item.impactOnReport}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-200/50">
                  <span className="font-bold text-[#1B5E3A] text-[11px] block">
                    Ação Operacional:
                  </span>
                  <span className="text-[#143028] text-[11px]">{item.fieldGuidance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default MissingInformationChecklist
