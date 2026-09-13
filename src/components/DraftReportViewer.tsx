import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Printer,
  Copy,
  ChevronDown,
  Building2,
  ShieldCheck,
  Scale,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useI18n } from '@/lib/i18n'
import type {
  DraftSection,
  EvidenceReference,
  MunicipalityTemplate,
} from '@/services/draftReportTypes'
import { MUNICIPALITY_TEMPLATES } from '@/services/draftReportFixtures'

interface DraftReportViewerProps {
  sections: DraftSection[]
  selectedMunicipality?: string
  onMunicipalityChange?: (muni: string) => void
  onApprove?: () => void
}

export const DraftReportViewer: React.FC<DraftReportViewerProps> = ({
  sections,
  selectedMunicipality = 'altamira',
  onMunicipalityChange,
  onApprove,
}) => {
  const { t } = useI18n()
  const { toast } = useToast()
  const [municipalityKey, setMunicipalityKey] = useState<string>(selectedMunicipality)
  const [activeModalEvidenceList, setActiveModalEvidenceList] = useState<{
    sectionTitle: string
    references: EvidenceReference[]
  } | null>(null)
  const [isReviewed, setIsReviewed] = useState(false)
  const [showHumanReviewModal, setShowHumanReviewModal] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const template: MunicipalityTemplate =
    MUNICIPALITY_TEMPLATES[municipalityKey] || MUNICIPALITY_TEMPLATES['altamira']

  const handlePrint = () => {
    window.print()
  }

  const handleCopyText = () => {
    const fullText = sections
      .map(
        (s) =>
          `${s.title}\n${s.content}\n[Fontes: ${s.references.map((r) => r.evidenceCode).join(', ')}]`,
      )
      .join('\n\n')
    navigator.clipboard.writeText(fullText)
    toast({ title: 'Minuta copiada para a área de transferência!' })
  }

  return (
    <div className="space-y-6">
      {/* Configuration & Municipality Selector */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#1B5E3A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
              Perfil Normativo do Município
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#143028]">{template.organName}</h3>
          <p className="text-xs text-[#5B6B63]">
            Base Legal Aplicada:{' '}
            <span className="font-semibold text-[#143028]">{template.normativeBase}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-full sm:w-56">
            <Select
              value={municipalityKey}
              onValueChange={(val) => {
                setMunicipalityKey(val)
                onMunicipalityChange?.(val)
              }}
            >
              <SelectTrigger className="h-9 text-xs font-semibold rounded-xl border-[#E2E8E4] bg-[#F7F9F8]">
                <SelectValue placeholder="Selecione o município" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#E2E8E4]">
                <SelectItem value="altamira">Altamira / PA</SelectItem>
                <SelectItem value="paragominas">Paragominas / PA</SelectItem>
                <SelectItem value="tailandia">Tailândia / PA</SelectItem>
                <SelectItem value="ulianopolis">Ulianópolis / PA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyText}
            className="h-9 text-xs border-[#E2E8E4] rounded-xl flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar texto</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="h-9 text-xs border-[#E2E8E4] rounded-xl flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Versão para impressão</span>
          </Button>
        </div>
      </div>

      {/* Main Draft Document Preview (Clean Paper Layout for Officials) */}
      <div className="rounded-3xl border border-[#D1DDD6] bg-[#FFFFFF] p-6 sm:p-10 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="text-center pb-6 border-b-2 border-[#143028] space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#5B6B63]">
            Estado do Pará • Poder Executivo Municipal
          </div>
          <h2 className="text-base sm:text-lg font-black text-[#143028] uppercase tracking-wide">
            {template.organName}
          </h2>
          <div className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] inline-block px-3 py-1 rounded-md">
            MINUTA DE RELATÓRIO DE FISCALIZAÇÃO AMBIENTAL • {template.headerCode}
          </div>
          <div className="text-[11px] text-[#5B6B63] max-w-xl mx-auto pt-1">
            "Com tudo que voltou do campo, produzimos uma minuta de relatório defensável
            demonstrando exatamente qual evidência sustenta cada afirmação."
          </div>
        </div>

        {/* Sections 1 to 10 */}
        <div className="space-y-6">
          {sections.map((sec) => {
            const hasMissing =
              sec.hasMissingInfo || sec.content.includes('[INFORMAÇÃO NÃO LOCALIZADA')
            const hasDivergence =
              sec.hasDivergence || sec.content.includes('[DIVERGÊNCIA ENCONTRADA')

            return (
              <div
                key={sec.id}
                className={`p-4 sm:p-5 rounded-2xl transition-all space-y-3 ${
                  hasDivergence
                    ? 'border-2 border-amber-300 bg-amber-50/30'
                    : hasMissing
                      ? 'border-2 border-red-200 bg-red-50/20'
                      : 'border border-[#E2E8E4] bg-white hover:border-[#1B5E3A]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#143028]">{sec.title}</h3>
                    {sec.subtitle && <p className="text-[11px] text-[#5B6B63]">{sec.subtitle}</p>}
                  </div>

                  {/* Evidence Reference Chips */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveModalEvidenceList({
                          sectionTitle: sec.title,
                          references: sec.references,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] hover:bg-[#d4e9df] border border-[#1B5E3A]/30 transition-all shadow-2xs hover:shadow-xs min-h-[32px] cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#1B5E3A]/40"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#1B5E3A]" />
                      <span>{sec.references.length} fontes comprovatórias</span>
                    </button>
                  </div>
                </div>
                {/* Section Content with Highlighted Warnings if Missing or Divergence */}
                <div className="text-xs sm:text-sm text-[#143028] leading-relaxed whitespace-pre-wrap font-sans">
                  {sec.content.split(/(\[.*?\])/g).map((part, pIdx) => {
                    if (
                      part.startsWith('[INFORMAÇÃO NÃO LOCALIZADA') ||
                      part.startsWith('[PENDENTE DE CONFIRMAÇÃO')
                    ) {
                      return (
                        <span
                          key={pIdx}
                          className="font-black text-red-950 bg-red-100/95 border-2 border-red-400 px-2.5 py-1 rounded-md inline-block my-1 shadow-2xs text-xs font-mono"
                        >
                          ⚠ {part}
                        </span>
                      )
                    }
                    if (
                      part.startsWith('[DIVERGÊNCIA ENCONTRADA') ||
                      part.startsWith('[ALERTA DE DIVERGÊNCIA')
                    ) {
                      return (
                        <span
                          key={pIdx}
                          className="font-black text-amber-950 bg-amber-100/95 border-2 border-amber-400 px-2.5 py-1 rounded-md inline-block my-1 shadow-2xs text-xs"
                        >
                          ⚡ {part}
                        </span>
                      )
                    }
                    return <span key={pIdx}>{part}</span>
                  })}
                </div>
                {/* Bottom Source Citations Ribbon */}
                <div className="pt-2 border-t border-[#E2E8E4] flex flex-wrap items-center gap-2 text-[11px] text-[#5B6B63]">
                  <span className="font-semibold text-[#143028]">Evidências vinculadas:</span>
                  {sec.references.map((r, rIdx) => (
                    <Link
                      key={rIdx}
                      to={`/evidence?source=${encodeURIComponent(r.evidenceCode)}`}
                      className="font-mono text-[10px] bg-[#F7F9F8] hover:bg-[#E7F2EC] border border-[#E2E8E4] hover:border-[#1B5E3A]/40 px-2 py-0.5 rounded-md text-[#1B5E3A] transition-colors flex items-center gap-1 cursor-pointer"
                      title={`Ir para a evidência ${r.evidenceCode}`}
                    >
                      <span>{r.evidenceCode}</span>
                      <span className="text-[#5B6B63]">({r.locationWithinEvidence})</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </Link>
                  ))}
                </div>{' '}
              </div>
            )
          })}
        </div>

        {/* Human Review & Final Approval Box */}
        <div className="p-6 rounded-3xl border-2 border-[#1B5E3A] bg-[#F9FCFA] space-y-4 print:hidden">
          <div className="flex items-center gap-2 text-[#1B5E3A]">
            <Scale className="w-5 h-5" />
            <h4 className="font-bold text-sm uppercase tracking-wide">
              Validação e Responsabilidade Técnica do Fiscal
            </h4>
          </div>

          {/* LGPD & Technical Responsibility Notice */}
          <div className="p-3.5 rounded-2xl bg-[#E7F2EC]/60 border border-[#1B5E3A]/25 text-xs text-[#143028] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#1B5E3A] shrink-0 mt-0.5" />
            <p className="font-semibold leading-relaxed">{t('decision.responsibility_notice')}</p>
          </div>

          <p className="text-xs text-[#5B6B63] leading-relaxed">
            Nenhum documento é finalizado sem validação humana expressa (LGPD art. 20). O
            RastroVerde apoia e organiza as evidências, mas cabe ao fiscal ou autoridade ambiental
            atestar a fidedignidade da peça instrutória.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#143028]">
              <input
                type="checkbox"
                checked={isReviewed}
                onChange={(e) => setIsReviewed(e.target.checked)}
                className="w-4 h-4 rounded text-[#1B5E3A] focus:ring-[#1B5E3A] accent-[#1B5E3A]"
              />
              <span>Revisei as evidências de campo e a minuta apresentada.</span>
            </label>

            <Button
              disabled={!isReviewed || isApproved}
              onClick={() => {
                setIsApproved(true)
                toast({
                  title: 'Minuta homologada pelo fiscal!',
                  description:
                    'A peça técnica foi aprovada com registro de rastreabilidade completa.',
                })
                onApprove?.()
              }}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-10 px-6 rounded-xl shadow-xs disabled:opacity-50"
            >
              {isApproved ? '✓ Minuta Homologada' : 'Aprovar minuta de fiscalização'}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Auditoria de Fontes da Seção */}
      {activeModalEvidenceList && (
        <Dialog
          open={!!activeModalEvidenceList}
          onOpenChange={() => setActiveModalEvidenceList(null)}
        >
          <DialogContent className="max-w-lg w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto rounded-3xl p-5 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-[#143028] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Fontes Probatórias que Sustentam Este Trecho</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-[#5B6B63]">
                {activeModalEvidenceList.sectionTitle}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 pt-2">
              {activeModalEvidenceList.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-[#E2E8E4] bg-[#F7F9F8] text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#1B5E3A]">{ref.evidenceCode}</span>
                    <span className="text-[10px] text-[#5B6B63] bg-white px-2 py-0.5 rounded-md border border-[#E2E8E4]">
                      {ref.evidenceType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5B6B63]">Localização na Evidência: </span>
                    <span className="font-semibold text-[#143028]">
                      {ref.locationWithinEvidence}
                    </span>
                  </div>
                  {ref.derivedSnippet && (
                    <div className="text-[11px] italic text-[#0F766E] bg-white p-2 rounded-xl border border-teal-200">
                      "{ref.derivedSnippet}"
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] text-[#5B6B63] pt-1">
                    <span>
                      Confiança: <strong className="text-emerald-700">{ref.confidence}</strong>
                    </span>
                    <span>Status: Confirmado em campo</span>
                  </div>
                  <div className="pt-1">
                    <Link
                      to={`/evidence?source=${encodeURIComponent(ref.evidenceCode)}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B5E3A] hover:underline"
                    >
                      <span>Abrir na Central de Evidências</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <Button
                  size="sm"
                  onClick={() => setActiveModalEvidenceList(null)}
                  className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold rounded-xl"
                >
                  Fechar lista de fontes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
export default DraftReportViewer
