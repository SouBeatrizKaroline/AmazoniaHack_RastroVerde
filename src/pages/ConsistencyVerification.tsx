import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  RefreshCw,
  ArrowRight,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getAllEvidence, getInspections } from '@/services/dataService'
import {
  DEMO_DIVERGENCES,
  DEMO_DOCUMENT_INSTRUMENTS,
  DEMO_INSTRUMENT_CONSISTENCY_CHECKS,
} from '@/services/draftReportFixtures'
import { DivergenceBlock } from '@/components/DivergenceBlock'
import { InstrumentConsistencyViewer } from '@/components/InstrumentConsistencyViewer'

export type VerificationFilterCategory =
  | 'ALL'
  | 'Confirmado'
  | 'Divergência'
  | 'Ausente'
  | 'Baixa confiança'
  | 'Requer revisão humana'

interface VerificationResult {
  id: string
  category: 'Confirmado' | 'Divergência' | 'Ausente' | 'Baixa confiança' | 'Requer revisão humana'
  badge: string
  color: string
  icon: any
  iconColor: string
  title: string
  message: string
  recommendation: string
  evidenceCode: string
}

export const ConsistencyVerification: React.FC = () => {
  const { t } = useI18n()
  const { toast } = useToast()
  const [recalculating, setRecalculating] = useState(false)
  const [items, setItems] = useState<VerificationResult[]>([])
  const [selectedCategory, setSelectedCategory] = useState<VerificationFilterCategory>('ALL')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const loadVerificationData = async () => {
    setLoading(true)
    setLoadError(null)

    const timeoutPromise = new Promise<'TIMEOUT'>((resolve) => {
      setTimeout(() => resolve('TIMEOUT'), 8000)
    })

    const fetchPromise = (async () => {
      const [inspections, evidenceList] = await Promise.all([
        getInspections().catch((e) => {
          console.warn('Verification getInspections error:', e)
          return [] as any[]
        }),
        getAllEvidence().catch((e) => {
          console.warn('Verification getAllEvidence error:', e)
          return [] as any[]
        }),
      ])

      const demoInsp = inspections.find((i) => i.id_number === 'RV-DEMO-001') || inspections[0]
      const results: VerificationResult[] = []

      // 1. Confirmado (Verde) - Compatibilidade temporal e metadados
      const photos = evidenceList.filter((e) => e.type === 'Fotografia')
      const firstPhoto = photos[0] || evidenceList[0]
      results.push({
        id: 'VER-001',
        category: 'Confirmado',
        badge: '🟢 Confirmado',
        color: 'border-emerald-200 bg-emerald-50/40 text-emerald-950',
        icon: CheckCircle2,
        iconColor: 'text-[#1B5E3A]',
        title: 'Compatibilidade temporal das fotografias',
        message: 'Data registrada nas fotografias coincide com a data da fiscalização.',
        recommendation:
          'Registros cronológicos e metadados encontram-se em conformidade com o cronograma da operação.',
        evidenceCode: firstPhoto ? firstPhoto.code : 'EVD-001',
      })

      // 2. Divergência (Amarelo) - Divergência de área 12,3 vs 11,8 ha
      results.push({
        id: 'VER-002',
        category: 'Divergência',
        badge: '🟡 Divergência',
        color: 'border-amber-300 bg-amber-50/50 text-amber-950',
        icon: AlertTriangle,
        iconColor: 'text-[#B45309]',
        title: 'Divergência de área: Satélite (12,3 ha) vs GPS de campo (11,8 ha)',
        message:
          'Constatada diferença métrica entre estimativa orbital preliminar e caminhamento perimetral.',
        recommendation:
          'Não consolidar valor único sem despacho fundamentado. Escolha entre satélite ou GPS com justificativa expressa na minuta.',
        evidenceCode: 'EVD-003',
      })

      // 3. Ausente (Cinza / Vermelho suave) - Documento ou agente não informado
      const missingOfficer = evidenceList.find((e) => !e.officer || e.officer.trim() === '')
      results.push({
        id: 'VER-003',
        category: 'Ausente',
        badge: '⚪ Ausente',
        color: 'border-slate-300 bg-slate-50/60 text-slate-900',
        icon: HelpCircle,
        iconColor: 'text-slate-600',
        title: 'Certidão dominial / Inscrição do CAR não anexada',
        message: 'Constatada autuação em campo sem o protocolo dominial correspondente nos autos.',
        recommendation:
          'Notificação formal emitida com assinalamento de prazo para apresentação do recibo do CAR ou matrícula.',
        evidenceCode: missingOfficer ? missingOfficer.code : 'EVD-004',
      })

      // 4. Baixa confiança (Amarelo / Laranja) - Metadados incompletos ou sinal fraco
      const secondEvd = evidenceList[1] || firstPhoto
      results.push({
        id: 'VER-004',
        category: 'Baixa confiança',
        badge: '🟠 Baixa confiança',
        color: 'border-orange-200 bg-orange-50/40 text-orange-950',
        icon: AlertTriangle,
        iconColor: 'text-orange-600',
        title: 'Precisão de posicionamento com raio de incerteza elevado',
        message:
          'Registro de coordenadas coletado sob dossel denso com margem de tolerância de ±18 metros.',
        recommendation:
          'Sinalizar na minuta a margem de erro instrumental do GPS portátil e cruzar com o marco físico.',
        evidenceCode: secondEvd ? secondEvd.code : 'EVD-002',
      })

      // 5. Requer revisão humana (Vermelho) - Conflito de depoimento / pendência técnica
      const inReview = evidenceList.find((e) => e.status === 'Em revisão')
      if (inReview) {
        results.push({
          id: 'VER-005',
          category: 'Requer revisão humana',
          badge: '🔴 Requer revisão humana',
          color: 'border-rose-300 bg-rose-50/50 text-rose-950',
          icon: AlertOctagon,
          iconColor: 'text-[#B3261E]',
          title: 'Depoimento de posse conflitante com registro de satélite anterior',
          message: `Evidência ${inReview.code} (${inReview.description}) sinalizada para deliberação do fiscal responsável.`,
          recommendation:
            'A decisão sobre qualificar reincidência ou ocupação prévia compete exclusivamente à autoridade fiscal.',
          evidenceCode: inReview.code,
        })
      } else {
        results.push({
          id: 'VER-005',
          category: 'Requer revisão humana',
          badge: '🔴 Requer revisão humana',
          color: 'border-rose-300 bg-rose-50/50 text-rose-950',
          icon: AlertOctagon,
          iconColor: 'text-[#B3261E]',
          title: 'Verificação do enquadramento normativo do dano ambiental',
          message:
            'Necessária confirmação humana do dispositivo legal aplicável antes de lavrar o auto.',
          recommendation:
            'Revisar a indicação do Art. 50 do Decreto Federal 6.514/2008 à luz das amostras botânicas.',
          evidenceCode: 'EVD-014',
        })
      }

      setItems(results)
      return true
    })()

    try {
      const race = await Promise.race([fetchPromise, timeoutPromise])
      if (race === 'TIMEOUT') {
        console.warn('ConsistencyVerification timed out after 8s')
        setLoadError('Tempo limite excedido ao rodar verificação de consistência.')
      }
    } catch (err: any) {
      console.error('Failed to run consistency verification:', err)
      setLoadError(err?.message || 'Falha na verificação de consistência.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVerificationData()
  }, [])

  const handleRerun = async () => {
    setRecalculating(true)
    await loadVerificationData()
    setRecalculating(false)
    toast({
      title: t('verification.toast_done_title'),
      description: t('verification.toast_done_desc'),
    })
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header com gradiente sutil alinhado ao padrão da landing */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-[#F9FCFA] to-[#EFF5F1] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143028] tracking-tight">
              {t('verification.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B63] mt-1">{t('verification.subtitle')}</p>
          </div>

          <Button
            onClick={handleRerun}
            disabled={recalculating}
            className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-10 px-4.5 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${recalculating ? 'animate-spin' : ''}`} />
            <span>{t('verification.rerun')}</span>
          </Button>
        </div>
      </div>

      {/* Cautious Language Banner com estilo refinado e sutil */}
      <div className="p-4 sm:p-5 rounded-2xl border border-sky-200/90 bg-gradient-to-r from-sky-50/70 via-sky-50/40 to-white text-xs text-sky-950 flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sky-950 block">{t('verification.posture_title')}</span>
          <p className="text-sky-900 leading-relaxed">
            {t('verification.cautious_notice')} {t('verification.cautious_detail')}
          </p>
        </div>
      </div>

      {/* Divergências em Aberto — Requisito 6 e Princípio Central de Confiança */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#143028] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Divergências Probatórias Detectadas (Não resolvidas silenciosamente)</span>
        </h2>
        <DivergenceBlock
          divergences={DEMO_DIVERGENCES}
          onResolve={(id, source, note) => {
            toast({
              title: 'Divergência resolvida tecnicamente',
              description: `Opção ${source} adotada com registro fundamentado.`,
            })
          }}
        />
      </div>

      {/* Cadeia e Consistência entre Instrumentos do Processo — Requisito 10 */}
      <div className="space-y-3 pt-4">
        <h2 className="text-base font-bold text-[#143028] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#1B5E3A]" />
          <span>Consistência do Processo entre Instrumentos</span>
        </h2>
        <InstrumentConsistencyViewer
          instruments={DEMO_DOCUMENT_INSTRUMENTS}
          checks={DEMO_INSTRUMENT_CONSISTENCY_CHECKS}
        />
      </div>

      {/* Category Pills Strip - Interativo com alvos ≥44px e as 5 categorias padronizadas */}
      <div className="flex flex-wrap items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl border border-[#E2E8E4] bg-white text-xs shadow-2xs">
        <span className="font-bold text-[#5B6B63] mr-1">Filtrar por classificação:</span>
        <button
          type="button"
          onClick={() => setSelectedCategory('ALL')}
          aria-pressed={selectedCategory === 'ALL'}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A] ${
            selectedCategory === 'ALL'
              ? 'bg-[#143028] text-white shadow-2xs'
              : 'bg-[#F7F9F8] text-[#5B6B63] border border-[#E2E8E4] hover:border-[#143028]/40'
          }`}
        >
          Todas ({items.length})
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('Confirmado')}
          aria-pressed={selectedCategory === 'Confirmado'}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 flex items-center gap-1.5 ${
            selectedCategory === 'Confirmado'
              ? 'bg-[#1B5E3A] text-white shadow-2xs'
              : 'bg-emerald-50 text-emerald-950 border border-emerald-200/80 hover:bg-emerald-100/70'
          }`}
        >
          <span>🟢 Confirmado</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/30 text-current">
            {items.filter((i) => i.category === 'Confirmado').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('Divergência')}
          aria-pressed={selectedCategory === 'Divergência'}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-600 flex items-center gap-1.5 ${
            selectedCategory === 'Divergência'
              ? 'bg-[#B45309] text-white shadow-2xs'
              : 'bg-amber-50 text-amber-950 border border-amber-300 hover:bg-amber-100/70'
          }`}
        >
          <span>🟡 Divergência</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/30 text-current">
            {items.filter((i) => i.category === 'Divergência').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('Ausente')}
          aria-pressed={selectedCategory === 'Ausente'}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-600 flex items-center gap-1.5 ${
            selectedCategory === 'Ausente'
              ? 'bg-slate-700 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200/70'
          }`}
        >
          <span>⚪ Ausente</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/30 text-current">
            {items.filter((i) => i.category === 'Ausente').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('Baixa confiança')}
          aria-pressed={selectedCategory === 'Baixa confiança'}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-600 flex items-center gap-1.5 ${
            selectedCategory === 'Baixa confiança'
              ? 'bg-orange-700 text-white shadow-2xs'
              : 'bg-orange-50 text-orange-950 border border-orange-200 hover:bg-orange-100/70'
          }`}
        >
          <span>🟠 Baixa confiança</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/30 text-current">
            {items.filter((i) => i.category === 'Baixa confiança').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('Requer revisão humana')}
          aria-pressed={selectedCategory === 'Requer revisão humana'}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-600 flex items-center gap-1.5 ${
            selectedCategory === 'Requer revisão humana'
              ? 'bg-[#B3261E] text-white shadow-2xs'
              : 'bg-rose-50 text-rose-950 border border-rose-300 hover:bg-rose-100/70'
          }`}
        >
          <span>🔴 Requer revisão humana</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/30 text-current">
            {items.filter((i) => i.category === 'Requer revisão humana').length}
          </span>
        </button>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-16 space-y-3">
          <div className="w-8 h-8 border-3 border-[#1B5E3A] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#5B6B63] font-semibold">{t('workspace.loading')}</span>
        </div>
      )}

      {!loading && loadError && (
        <div className="p-8 text-center rounded-3xl border border-amber-200 bg-amber-50/50 space-y-3">
          <p className="text-xs text-amber-900 font-medium">{loadError}</p>
          <Button
            size="sm"
            onClick={() => loadVerificationData()}
            className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs"
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Result Cards Grid com design elegante, sem cores gritantes */}
      {!loading && !loadError && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items
            .filter((item) => selectedCategory === 'ALL' || item.category === selectedCategory)
            .map((item) => {
              const Icon = item.icon

              // Estilo de borda e fundo conforme as 5 categorias padronizadas
              const borderStyle =
                item.category === 'Confirmado'
                  ? 'border-emerald-200/90 hover:border-emerald-400'
                  : item.category === 'Divergência'
                    ? 'border-amber-300/90 hover:border-amber-400'
                    : item.category === 'Ausente'
                      ? 'border-slate-300/90 hover:border-slate-400'
                      : item.category === 'Baixa confiança'
                        ? 'border-orange-200/90 hover:border-orange-400'
                        : 'border-rose-300/90 hover:border-rose-400'

              const badgeBg =
                item.category === 'Confirmado'
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : item.category === 'Divergência'
                    ? 'bg-amber-50 text-amber-950 border-amber-300'
                    : item.category === 'Ausente'
                      ? 'bg-slate-100 text-slate-900 border-slate-300'
                      : item.category === 'Baixa confiança'
                        ? 'bg-orange-50 text-orange-950 border-orange-200'
                        : 'bg-rose-50 text-rose-950 border-rose-300'

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 bg-white transition-all duration-200 hover:shadow-md ${borderStyle}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeBg}`}
                      >
                        {item.badge}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-[#5B6B63] bg-[#F7F9F8] px-2 py-0.5 rounded-md border border-[#E2E8E4]">
                        {item.id}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-[#F9FCFA] border border-[#E2E8E4] shrink-0 mt-0.5">
                        <Icon className={`w-4 h-4 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm sm:text-base text-[#143028] leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs font-medium text-[#5B6B63] mt-1 leading-relaxed">
                          "{item.message}"
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F9FCFA] border border-[#E2E8E4] text-xs text-[#5B6B63] space-y-1">
                      <span className="font-bold text-[#143028] block">
                        {t('verification.rec_title')}
                      </span>
                      <p className="leading-relaxed">{item.recommendation}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8E4] flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#1B5E3A] bg-[#E7F2EC] px-2.5 py-0.5 rounded-md border border-[#1B5E3A]/15">
                      {t('verification.ref_prefix')} {item.evidenceCode}
                    </span>

                    <Link
                      to={`/evidence?source=${item.evidenceCode}`}
                      className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#1B5E3A] hover:bg-[#E7F2EC] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A] group"
                    >
                      <span>{t('verification.go_to_evidence')}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
export default ConsistencyVerification
