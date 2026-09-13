import React, { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileCheck2,
  Radio,
  UserCheck,
  ShieldAlert,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { DivergenceItem } from '@/services/draftReportTypes'

interface DivergenceBlockProps {
  divergences: DivergenceItem[]
  onResolve?: (
    divergenceId: string,
    selectedSource: 'sourceA' | 'sourceB' | 'custom',
    notes: string,
  ) => void
}

export const DivergenceBlock: React.FC<DivergenceBlockProps> = ({ divergences, onResolve }) => {
  const { t } = useI18n()
  const [resolutions, setResolutions] = useState<
    Record<string, { choice: 'sourceA' | 'sourceB' | 'custom'; explanation: string }>
  >({})

  const handleSelectChoice = (id: string, choice: 'sourceA' | 'sourceB' | 'custom') => {
    setResolutions((prev) => ({
      ...prev,
      [id]: {
        choice,
        explanation: prev[id]?.explanation || '',
      },
    }))
  }

  const handleExplanationChange = (id: string, text: string) => {
    setResolutions((prev) => ({
      ...prev,
      [id]: {
        choice: prev[id]?.choice || 'sourceB',
        explanation: text,
      },
    }))
  }

  return (
    <div className="space-y-4">
      {divergences.map((div) => {
        const currentRes = resolutions[div.id]
        const isResolved = div.status === 'resolvido' || !!currentRes?.choice

        return (
          <div
            key={div.id}
            className={`rounded-3xl border-2 p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-200 ${
              isResolved
                ? 'border-emerald-300 bg-emerald-50/40 ring-1 ring-emerald-200'
                : 'border-amber-400 bg-gradient-to-b from-amber-50/90 to-amber-100/40 ring-2 ring-amber-300/60 shadow-amber-200/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-950 bg-amber-200/90 border border-amber-300/80 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                    Divergência encontrada — Requer validação humana
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-[#143028] mt-0.5">
                    {div.fieldLabel}
                  </h4>
                </div>
              </div>

              <div
                className={`text-xs font-semibold px-3 py-1 rounded-xl self-start sm:self-auto border ${
                  isResolved
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-amber-100 text-amber-950 border-amber-300'
                }`}
              >
                Status: {isResolved ? 'Resolvido pelo fiscal' : div.status}
              </div>
            </div>

            <p className="text-xs text-[#143028] leading-relaxed">
              O sistema detectou valores divergentes entre as evidências de campo coletadas. Em
              conformidade com as regras de integridade probatória, nenhuma hipótese é adotada
              silenciosamente:
            </p>

            {/* Side-by-Side Sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fonte A */}
              <div
                onClick={() => handleSelectChoice(div.id, 'sourceA')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                  currentRes?.choice === 'sourceA'
                    ? 'border-[#1B5E3A] bg-emerald-50/70 ring-1 ring-[#1B5E3A]'
                    : 'border-amber-200 bg-white hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#143028] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-bold">
                      A
                    </span>
                    <span>Fonte 1: {div.sourceA.source}</span>
                  </span>
                  <span className="text-[10px] text-[#5B6B63] bg-[#F7F9F8] px-2 py-0.5 rounded-md">
                    {div.sourceA.type}
                  </span>
                </div>
                <div className="text-lg font-mono font-bold text-[#1B5E3A]">
                  {div.sourceA.value}
                </div>
                <div className="text-xs text-[#5B6B63]">
                  <span className="font-semibold text-[#143028]">Localização: </span>
                  {div.sourceA.location}
                </div>
                <div className="pt-2">
                  <Button
                    type="button"
                    variant={currentRes?.choice === 'sourceA' ? 'default' : 'outline'}
                    size="sm"
                    className={`w-full text-xs h-8 ${
                      currentRes?.choice === 'sourceA'
                        ? 'bg-[#1B5E3A] hover:bg-[#14502F] text-white'
                        : 'border-[#E2E8E4]'
                    }`}
                  >
                    {currentRes?.choice === 'sourceA'
                      ? '✓ Fonte A Selecionada'
                      : 'Adotar valor da Fonte A'}
                  </Button>
                </div>
              </div>

              {/* Fonte B */}
              <div
                onClick={() => handleSelectChoice(div.id, 'sourceB')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                  currentRes?.choice === 'sourceB'
                    ? 'border-[#1B5E3A] bg-emerald-50/70 ring-1 ring-[#1B5E3A]'
                    : 'border-amber-200 bg-white hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#143028] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-bold">
                      B
                    </span>
                    <span>Fonte 2: {div.sourceB.source}</span>
                  </span>
                  <span className="text-[10px] text-[#5B6B63] bg-[#F7F9F8] px-2 py-0.5 rounded-md">
                    {div.sourceB.type}
                  </span>
                </div>
                <div className="text-lg font-mono font-bold text-[#1B5E3A]">
                  {div.sourceB.value}
                </div>
                <div className="text-xs text-[#5B6B63]">
                  <span className="font-semibold text-[#143028]">Localização: </span>
                  {div.sourceB.location}
                </div>
                <div className="pt-2">
                  <Button
                    type="button"
                    variant={currentRes?.choice === 'sourceB' ? 'default' : 'outline'}
                    size="sm"
                    className={`w-full text-xs h-8 ${
                      currentRes?.choice === 'sourceB'
                        ? 'bg-[#1B5E3A] hover:bg-[#14502F] text-white'
                        : 'border-[#E2E8E4]'
                    }`}
                  >
                    {currentRes?.choice === 'sourceB'
                      ? '✓ Fonte B Selecionada'
                      : 'Adotar valor da Fonte B'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Resolution Justification Box */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-2.5">
              {/* LGPD & Fiscal Responsibility Notice */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="font-medium leading-relaxed">{t('decision.responsibility_notice')}</p>
              </div>

              <label className="text-xs font-bold text-[#143028] flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#1B5E3A]" />
                <span>
                  Justificativa da Decisão Técnica (Registrada na minuta com autoria do fiscal):
                </span>
              </label>
              <Textarea
                value={currentRes?.explanation || div.selectedExplanation || ''}
                onChange={(e) => handleExplanationChange(div.id, e.target.value)}
                placeholder="Exemplo: Adotada a medição vetorial por drone (11,8 ha) por possuir calibração geodésica superior às anotações estimadas na prancheta."
                className="text-xs min-h-[64px] border-[#E2E8E4] focus-visible:ring-[#1B5E3A]"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-[#5B6B63]">
                  A decisão ficará consignada no item "10. Pendências e ressalvas" da minuta gerada.
                </span>
                <Button
                  size="sm"
                  onClick={() => {
                    if (currentRes?.choice) {
                      onResolve?.(
                        div.id,
                        currentRes.choice,
                        currentRes.explanation || 'Decisão técnica fundamentada pelo fiscal.',
                      )
                    }
                  }}
                  className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-8 px-4 rounded-lg"
                >
                  Registrar decisão probatória
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default DivergenceBlock
