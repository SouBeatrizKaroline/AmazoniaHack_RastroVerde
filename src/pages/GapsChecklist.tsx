import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { CheckCircle2, AlertTriangle, XCircle, Plus, ShieldCheck, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getAllEvidence, getInspections } from '@/services/dataService'

interface GapItem {
  id: string
  title: string
  category: 'completed' | 'pending' | 'missing'
  status: string
  description: string
  action: string | null
  route?: string
}

export const GapsChecklist: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [items, setItems] = useState<GapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    loadGapsFromData()
  }, [])

  const loadGapsFromData = async () => {
    setLoading(true)
    setLoadError(null)

    const timeoutPromise = new Promise<'TIMEOUT'>((resolve) => {
      setTimeout(() => resolve('TIMEOUT'), 8000)
    })

    const fetchPromise = (async () => {
      const [inspections, evidenceList] = await Promise.all([
        getInspections().catch((e) => {
          console.warn('GapsChecklist getInspections error:', e)
          return [] as any[]
        }),
        getAllEvidence().catch((e) => {
          console.warn('GapsChecklist getAllEvidence error:', e)
          return [] as any[]
        }),
      ])

      const demoInsp = inspections.find((i) => i.id_number === 'RV-DEMO-001') || inspections[0]
      const computed: GapItem[] = []

      // 1. Location requirement
      if (demoInsp && demoInsp.latitude && demoInsp.longitude) {
        computed.push({
          id: 'gap-loc',
          title: 'Localização registrada',
          category: 'completed',
          status: '✅',
          description: `Marco georreferenciado (${demoInsp.latitude}, ${demoInsp.longitude}) inserido no SIRGAS 2000.`,
          action: null,
        })
      } else {
        computed.push({
          id: 'gap-loc-missing',
          title: 'Localização geográfica incompleta',
          category: 'missing',
          status: '❌',
          description: 'Fiscalização sem coordenadas georreferenciadas completas.',
          action: 'Preencher Coordenadas',
          route: demoInsp ? `/inspections/${demoInsp.id_number}/edit` : '/inspections',
        })
      }

      // 2. Photographic evidence
      const photos = evidenceList.filter((e) => e.type === 'Fotografia')
      if (photos.length > 0) {
        computed.push({
          id: 'gap-photo',
          title: 'Evidências fotográficas catalogadas',
          category: 'completed',
          status: '✅',
          description: `${photos.length} fotografias com carimbo e metadados persistidos no banco.`,
          action: null,
        })
      } else {
        computed.push({
          id: 'gap-photo-missing',
          title: 'Nenhuma evidência fotográfica registrada',
          category: 'missing',
          status: '❌',
          description: 'A operação necessita de registros visuais para instruir o auto.',
          action: 'Adicionar Foto',
          route: '/evidence',
        })
      }

      // 3. Inspection date / time
      if (demoInsp && demoInsp.date) {
        computed.push({
          id: 'gap-date',
          title: 'Data e horário de vistoria',
          category: 'completed',
          status: '✅',
          description: `Realizada em ${demoInsp.date} às ${demoInsp.time || '08:30'}.`,
          action: null,
        })
      }

      // 4. Responsible officer
      const missingOfficer = evidenceList.filter((e) => !e.officer || e.officer.trim() === '')
      if (missingOfficer.length === 0) {
        computed.push({
          id: 'gap-officer-ok',
          title: 'Identificação dos agentes fiscais',
          category: 'completed',
          status: '✅',
          description: 'Todos os registros contam com agente técnico identificado.',
          action: null,
        })
      } else {
        computed.push({
          id: 'gap-officer-pending',
          title: `Agente fiscal pendente em ${missingOfficer.length} evidência(s)`,
          category: 'pending',
          status: '⚠️',
          description: `Evidências sem agente qualificado: ${missingOfficer.map((e) => e.code).join(', ')}.`,
          action: 'Identificar Agente',
          route: '/evidence',
        })
      }

      // 5. In-review evidence
      const inReviewEvds = evidenceList.filter((e) => e.status === 'Em revisão')
      if (inReviewEvds.length > 0) {
        computed.push({
          id: 'gap-in-review',
          title: `${inReviewEvds.length} evidência(s) em revisão técnica`,
          category: 'pending',
          status: '⚠️',
          description: `Registros que aguardam conferência: ${inReviewEvds.map((e) => e.code).join(', ')}.`,
          action: 'Revisar no Centro de Evidências',
          route: '/evidence',
        })
      }

      // 6. Documents (e.g. CAR / Matrícula)
      const docs = evidenceList.filter((e) => e.type === 'Documento')
      if (docs.length === 0) {
        computed.push({
          id: 'gap-doc-missing',
          title: 'Documento de propriedade / CAR não anexado',
          category: 'pending',
          status: '⚠️',
          description:
            'Notificação formal emitida mas certidão dominial ou recibo do CAR ainda pendente.',
          action: 'Anexar Documento',
          route: '/evidence',
        })
      } else {
        computed.push({
          id: 'gap-doc-ok',
          title: `Documentos anexados (${docs.length})`,
          category: 'completed',
          status: '✅',
          description: `Juntados aos autos: ${docs.map((d) => `${d.code}`).join(', ')}.`,
          action: null,
        })
      }

      // 7. Area polygon / estimation
      computed.push({
        id: 'gap-area-calc',
        title: 'Poligonal vetorial e cálculo de área definitivo',
        category: 'missing',
        status: '❌',
        description:
          'Delimitação por satélite preliminar pendente de arquivo shapefile definitivo.',
        action: 'Editar Fiscalização',
        route: demoInsp ? `/inspections/${demoInsp.id_number}/edit` : '/inspections',
      })

      setItems(computed)
      return true
    })()

    try {
      const race = await Promise.race([fetchPromise, timeoutPromise])
      if (race === 'TIMEOUT') {
        console.warn('GapsChecklist timed out after 8s')
        setLoadError('Tempo limite excedido ao checar pendências e lacunas.')
      }
    } catch (err: any) {
      console.error('Failed to load dynamic gaps:', err)
      setLoadError(err?.message || 'Falha ao processar lacunas.')
    } finally {
      setLoading(false)
    }
  }

  const completedCount = items.filter((i) => i.category === 'completed').length
  const totalCount = items.length
  const completeness = Math.round((completedCount / totalCount) * 100)

  const handleResolveAction = (route: string | null) => {
    if (route) {
      navigate(route)
    } else {
      toast({ title: t('gaps.toast_validated') })
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header com gradiente sutil alinhado ao padrão da landing */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-[#F9FCFA] to-[#EFF5F1] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143028] tracking-tight">
              {t('gaps.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B63] mt-1">{t('gaps.subtitle')}</p>
          </div>

          <Link to="/reports">
            <Button className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-10 px-4.5 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto">
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>{t('gaps.go_to_report')}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Completeness Card refinado com cantos consistentes e sombra suave */}
      <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-r from-[#E7F2EC]/80 via-[#E7F2EC]/40 to-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E3A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('workspace.integrity_status_title')}</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#143028] tracking-tight">
              {t('workspace.completeness_title')}: {completeness}%
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#5B6B63] bg-white px-3.5 py-1 rounded-full border border-[#E2E8E4] shadow-2xs self-start sm:self-auto">
            {t('workspace.items_fulfilled')
              .replace('{completed}', String(completedCount))
              .replace('{total}', String(totalCount))}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-[#E2E8E4] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1B5E3A] h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${completeness}%` }}
          />
        </div>

        <p className="text-xs text-[#143028] font-medium leading-relaxed">
          {t('workspace.completeness_advice')}
        </p>
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
            onClick={() => loadGapsFromData()}
            className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs"
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Checklist Sections com cards arredondados e bordas sutis */}
      {!loading && !loadError && (
        <div className="space-y-4">
          {/* Completed items */}
          <div className="rounded-3xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {t('gaps.completed')} ({completedCount})
              </span>
            </div>

            <div className="space-y-2.5">
              {items
                .filter((i) => i.category === 'completed')
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 text-xs transition-colors hover:bg-emerald-50/60"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#143028] flex items-center gap-2 text-sm">
                        <span>{item.status}</span>
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-[#5B6B63] leading-relaxed">{item.description}</p>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs self-start sm:self-center shrink-0">
                      {t('workspace.item_validated')}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Pending review items */}
          <div className="rounded-3xl border border-amber-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>
                {t('gaps.pending_review')} ({items.filter((i) => i.category === 'pending').length})
              </span>
            </div>

            <div className="space-y-2.5">
              {items
                .filter((i) => i.category === 'pending')
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 text-xs transition-colors hover:bg-amber-50/60"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#143028] flex items-center gap-2 text-sm">
                        <span>{item.status}</span>
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-amber-950/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.action && (
                      <Button
                        size="sm"
                        onClick={() => handleResolveAction(item.route || null)}
                        className="self-end sm:self-center bg-[#B45309] hover:bg-amber-800 text-white text-xs font-bold h-9 px-3.5 rounded-xl shadow-2xs shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        <span>{item.action || t('gaps.action_add')}</span>
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Missing item */}
          <div className="rounded-3xl border border-rose-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-900">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>
                {t('gaps.missing_item')} ({items.filter((i) => i.category === 'missing').length})
              </span>
            </div>

            <div className="space-y-2.5">
              {items
                .filter((i) => i.category === 'missing')
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-rose-50/40 border border-rose-200/80 text-xs transition-colors hover:bg-rose-50/60"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-rose-950 flex items-center gap-2 text-sm">
                        <span>{item.status}</span>
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-rose-950/80 leading-relaxed">{item.description}</p>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleResolveAction(item.route)}
                      className="self-end sm:self-center bg-[#B3261E] hover:bg-red-800 text-white text-xs font-bold h-9 px-3.5 rounded-xl shadow-2xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>{item.action || t('gaps.action_add')}</span>
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default GapsChecklist
