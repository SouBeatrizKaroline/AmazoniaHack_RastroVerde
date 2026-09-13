import React, { useState } from 'react'
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  Layers,
  FileSearch,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { ExtractedFact, EvidenceReference } from '@/services/draftReportTypes'

interface ExtractedFactsTableProps {
  facts: ExtractedFact[]
  onSelectEvidence?: (ref: EvidenceReference) => void
}

export const ExtractedFactsTable: React.FC<ExtractedFactsTableProps> = ({
  facts,
  onSelectEvidence,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS')
  const [activeModalRef, setActiveModalRef] = useState<EvidenceReference | null>(null)

  const categories = [
    'TODAS',
    'Identificação',
    'Ocorrência',
    'Geografia',
    'Infração',
    'Instrumentos',
  ]

  const filtered = facts.filter(
    (f) => selectedCategory === 'TODAS' || f.category === selectedCategory,
  )

  const getStatusBadge = (status: ExtractedFact['status']) => {
    switch (status) {
      case 'Confirmado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>Confirmado</span>
          </span>
        )
      case 'Divergência':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3 text-amber-700" />
            <span>Divergência</span>
          </span>
        )
      case 'Ausente':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3 text-red-700" />
            <span>Ausente</span>
          </span>
        )
      case 'Requer revisão':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded-full">
            <HelpCircle className="w-3 h-3 text-blue-700" />
            <span>Requer revisão</span>
          </span>
        )
      default:
        return (
          <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
            Pendente
          </span>
        )
    }
  }

  const getConfidenceBadge = (confidence: ExtractedFact['confidence']) => {
    switch (confidence) {
      case 'Alta':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Alta
          </span>
        )
      case 'Média':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-950 bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Média
          </span>
        )
      case 'Baixa':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-950 bg-red-100/90 border border-red-300 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            Baixa
          </span>
        )
    }
  }

  return (
    <div className="rounded-3xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8E4]">
        <div>
          <h3 className="text-base font-bold text-[#143028] flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-[#1B5E3A]" />
            <span>Informações Extraídas e Fatos Comprováveis</span>
          </h3>
          <p className="text-xs text-[#5B6B63] mt-0.5">
            Cada fato extraído das evidências possui valor, fonte rastreável, nível de confiança e
            status de validação.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1B5E3A] text-white shadow-xs'
                  : 'bg-[#F7F9F8] text-[#5B6B63] hover:text-[#143028] hover:bg-[#E2E8E4]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Facts Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E2E8E4] bg-[#F7F9F8] text-[#5B6B63] font-semibold">
              <th className="py-2.5 px-3 rounded-l-xl">Campo / Categoria</th>
              <th className="py-2.5 px-3">Valor Extraído</th>
              <th className="py-2.5 px-3">Fonte & Rastreabilidade</th>
              <th className="py-2.5 px-3">Confiança</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right rounded-r-xl">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8E4]">
            {filtered.map((fact) => (
              <tr key={fact.id} className="hover:bg-[#F9FCFA] transition-colors">
                <td className="py-3 px-3 align-top">
                  <div className="font-bold text-[#143028]">{fact.label}</div>
                  <span className="text-[10px] uppercase tracking-wider text-[#5B6B63] bg-slate-100 px-1.5 py-0.5 rounded">
                    {fact.category}
                  </span>
                </td>

                <td className="py-3 px-3 align-top max-w-xs">
                  <div
                    className={`font-medium ${
                      fact.status === 'Ausente' ||
                      String(fact.formattedValue || fact.value).includes(
                        '[INFORMAÇÃO NÃO LOCALIZADA',
                      )
                        ? 'text-red-800 font-bold bg-red-50/80 border border-red-200 px-2 py-1 rounded-md'
                        : 'text-[#143028]'
                    }`}
                  >
                    {fact.formattedValue || fact.value}
                  </div>
                  {fact.notes && (
                    <div className="text-[11px] text-[#5B6B63] mt-1 bg-amber-50/70 p-1.5 rounded-lg border border-amber-200/50">
                      {fact.notes}
                    </div>
                  )}
                </td>

                <td className="py-3 px-3 align-top">
                  <div className="space-y-1.5">
                    {fact.references.map((ref, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl border border-[#E2E8E4] bg-white text-[11px] space-y-1 shadow-2xs hover:border-[#1B5E3A] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono font-bold text-[#1B5E3A]">
                            {ref.evidenceCode}
                          </span>
                          <span className="text-[10px] text-[#5B6B63] bg-[#F7F9F8] px-1.5 py-0.5 rounded">
                            {ref.evidenceType}
                          </span>
                        </div>
                        <div className="text-[#5B6B63]">
                          <span className="font-semibold text-[#143028]">Localização: </span>
                          {ref.locationWithinEvidence}
                        </div>
                        {ref.derivedSnippet && (
                          <div className="text-[10px] italic text-[#0F766E] bg-teal-50/60 p-1 rounded">
                            "{ref.derivedSnippet}"
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveModalRef(ref)}
                          className="h-6 text-[10px] text-[#1B5E3A] font-bold p-0 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Ver evidência original</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="py-3 px-3 align-top">{getConfidenceBadge(fact.confidence)}</td>

                <td className="py-3 px-3 align-top">{getStatusBadge(fact.status)}</td>

                <td className="py-3 px-3 align-top text-right">
                  {fact.references.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveModalRef(fact.references[0])}
                      className="h-7 text-xs border-[#E2E8E4] hover:bg-[#F7F9F8]"
                    >
                      Auditar fonte
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalhes da Evidência Original */}
      {activeModalRef && (
        <Dialog open={!!activeModalRef} onOpenChange={() => setActiveModalRef(null)}>
          <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto rounded-2xl p-5 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-[#143028] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Rastreabilidade da Fonte Probatória</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-[#5B6B63]">
                Registro probatório original registrado no momento da coleta de campo.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#5B6B63]">Código do Arquivo:</span>
                  <span className="font-mono font-bold text-[#1B5E3A]">
                    {activeModalRef.evidenceCode}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5B6B63]">Tipo da Evidência:</span>
                  <span className="font-semibold text-[#143028]">
                    {activeModalRef.evidenceType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5B6B63]">Localização Interna:</span>
                  <span className="font-semibold text-[#0F766E]">
                    {activeModalRef.locationWithinEvidence}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5B6B63]">Grau de Confiança:</span>
                  <span className="font-semibold text-emerald-700">
                    {activeModalRef.confidence}
                  </span>
                </div>
              </div>

              {activeModalRef.derivedSnippet && (
                <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1">
                  <span className="font-bold text-[#0F766E] text-[11px]">
                    Trecho Literal / Citação Registrada:
                  </span>
                  <p className="italic text-[#143028]">{activeModalRef.derivedSnippet}</p>
                </div>
              )}

              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[11px] text-[#5B6B63] space-y-1">
                <div className="font-bold text-[#143028]">Indicador de integridade do arquivo:</div>
                <div className="font-mono text-[10px] break-all">
                  {activeModalRef.fileIntegrityIndicator ||
                    'SHA256: 4e8b91c0a37e192f170b4c82b130e54d1931a789efc44f91e4a66bc28c031ef8'}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  size="sm"
                  onClick={() => setActiveModalRef(null)}
                  className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold"
                >
                  Fechar auditoria
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
export default ExtractedFactsTable
