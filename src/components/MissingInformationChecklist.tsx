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
  const [highContrastMode, setHighContrastMode] = React.useState(false)
  const criticalItems = items.filter((i) => i.category === 'crítico')
  const importantItems = items.filter((i) => i.category === 'importante')

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Alert Header Banner com controles móveis de alto contraste para sol forte */}
      <div
        className={`rounded-3xl border-2 transition-colors p-5 sm:p-6 shadow-xs space-y-4 ${
          highContrastMode
            ? 'bg-amber-100 border-amber-500 text-black'
            : 'border-amber-300 bg-amber-50/50 text-[#143028]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#143028] tracking-tight">
                O que falta para fechar o caso com defensabilidade técnica?
              </h3>
              <p className="text-xs sm:text-sm text-amber-950 font-medium mt-0.5">
                Orientação operacional em campo: dados recomendados para coleta antes de
                desmobilizar a equipe da poligonal.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* Botão de Modo Sol Forte / Alto Contraste para Celular */}
            <button
              type="button"
              onClick={() => setHighContrastMode(!highContrastMode)}
              aria-pressed={highContrastMode}
              className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A] ${
                highContrastMode
                  ? 'bg-black text-yellow-300 border-black shadow-md'
                  : 'bg-white text-[#143028] border-amber-300 hover:bg-amber-100/50'
              }`}
            >
              <span>{highContrastMode ? '☀️ Modo Sol: Ativo' : '☀️ Modo Luz Solar'}</span>
            </button>

            <Button
              size="sm"
              onClick={handlePrint}
              className="min-h-[44px] bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold px-4 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>Imprimir / PDF de Campo</span>
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
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-all ${
                highContrastMode
                  ? 'border-red-600 bg-red-100 text-black'
                  : 'border-red-200 bg-red-50/30 hover:border-red-300 text-[#143028]'
              }`}
            >
              <label
                htmlFor={`crit-check-${item.id}`}
                className="flex items-start justify-between gap-3 cursor-pointer min-h-[44px]"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                    <span className="text-red-700 font-black text-base">⚠</span>
                    <span className={item.resolved ? 'line-through opacity-70' : ''}>
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#4B5563] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {/* Alvo de toque de 44x44px em volta do checkbox para uso com luvas e campo */}
                <div className="min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0">
                  <input
                    id={`crit-check-${item.id}`}
                    type="checkbox"
                    checked={item.resolved}
                    onChange={() => onToggleItem?.(item.id)}
                    aria-label={`Marcar ${item.title} como resolvido`}
                    className="w-5 h-5 rounded-md text-[#1B5E3A] focus:ring-[#1B5E3A] accent-[#1B5E3A] cursor-pointer"
                  />
                </div>
              </label>

              <div className="pt-2.5 border-t border-red-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-red-100/80 shadow-2xs">
                  <span className="font-bold text-red-900 text-xs block mb-0.5">
                    Impacto no Relatório:
                  </span>
                  <span className="text-[#374151] font-medium leading-relaxed">
                    {item.impactOnReport}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 shadow-2xs">
                  <span className="font-bold text-[#1B5E3A] text-xs block mb-0.5">
                    Ação Recomendada em Campo:
                  </span>
                  <span className="text-[#143028] font-medium leading-relaxed">
                    {item.fieldGuidance}
                  </span>
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
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-all ${
                highContrastMode
                  ? 'border-amber-600 bg-amber-100 text-black'
                  : 'border-amber-200 bg-amber-50/20 hover:border-amber-300 text-[#143028]'
              }`}
            >
              <label
                htmlFor={`imp-check-${item.id}`}
                className="flex items-start justify-between gap-3 cursor-pointer min-h-[44px]"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                    <span className="text-amber-700 font-black text-base">⚠</span>
                    <span className={item.resolved ? 'line-through opacity-70' : ''}>
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#4B5563] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {/* Alvo de toque de 44x44px em volta do checkbox para uso com luvas e campo */}
                <div className="min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0">
                  <input
                    id={`imp-check-${item.id}`}
                    type="checkbox"
                    checked={item.resolved}
                    onChange={() => onToggleItem?.(item.id)}
                    aria-label={`Marcar ${item.title} como resolvido`}
                    className="w-5 h-5 rounded-md text-[#1B5E3A] focus:ring-[#1B5E3A] accent-[#1B5E3A] cursor-pointer"
                  />
                </div>
              </label>

              <div className="pt-2.5 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-amber-100/80 shadow-2xs">
                  <span className="font-bold text-amber-900 text-xs block mb-0.5">
                    Impacto na Minuta:
                  </span>
                  <span className="text-[#374151] font-medium leading-relaxed">
                    {item.impactOnReport}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 shadow-2xs">
                  <span className="font-bold text-[#1B5E3A] text-xs block mb-0.5">
                    Ação Operacional:
                  </span>
                  <span className="text-[#143028] font-medium leading-relaxed">
                    {item.fieldGuidance}
                  </span>
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
