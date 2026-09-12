import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  FileCheck2,
  Calendar,
  Clock,
  MapPin,
  User,
  Shield,
  Layers,
  Camera,
  SearchCheck,
  CheckSquare,
  FileText,
  Edit2,
  AlertTriangle,
  ArrowRight,
  Info,
  ChevronRight,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
import {
  getInspections,
  getInspectionById,
  getInspectionByNumber,
  getEvidenceByInspection,
  getActivitiesByInspection,
  updateInspection,
  createEvidence,
  updateEvidence,
  type InspectionRecord,
  type EvidenceRecord,
  type ActivityRecord,
} from '@/services/dataService'
import { EvidenceCard } from '@/components/EvidenceCard'
import { EvidenceModal } from '@/components/EvidenceModal'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const InspectionDetail: React.FC = () => {
  const { t } = useI18n()
  const { id: rawId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Se id vier indefinido, string 'undefined', 'demo' ou vazio, adotar imediatamente 'RV-DEMO-001'
  const targetId =
    !rawId || rawId === 'undefined' || rawId === 'null' || rawId === 'demo' ? 'RV-DEMO-001' : rawId

  const [inspection, setInspection] = useState<InspectionRecord | null>(null)
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>([])
  const [activitiesList, setActivitiesList] = useState<ActivityRecord[]>([])
  const [activeTab, setActiveTab] = useState<
    'overview' | 'evidence' | 'timeline' | 'verification' | 'gaps' | 'report'
  >('overview')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEvidence, setEditingEvidence] = useState<EvidenceRecord | null>(null)

  useRealtime('inspections', () => {
    loadData()
  })
  useRealtime('evidence', () => {
    loadData()
  })
  useRealtime('activities', () => {
    loadData()
  })

  const [loadError, setLoadError] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    setLoadError(null)

    // Safety timeout: ensure loading cannot hang infinitely (e.g. 8s maximum)
    const timeoutPromise = new Promise<'TIMEOUT'>((resolve) => {
      setTimeout(() => resolve('TIMEOUT'), 8000)
    })

    const fetchPromise = (async () => {
      let record: InspectionRecord | null = null
      const id = targetId

      // Direct check: is it RV-DEMO-001, id starts with RV-, or matches demo
      if (id === 'RV-DEMO-001' || id.includes('RV-DEMO-001') || id === 'demo') {
        try {
          record = await getInspectionByNumber('RV-DEMO-001')
        } catch (e1) {
          console.warn('getInspectionByNumber failed for demo, trying getInspectionById:', e1)
          try {
            record = await getInspectionById('9ykaitbzexx3fy5')
          } catch (e2) {
            console.warn('getInspectionById failed for demo, searching list:', e2)
            try {
              const demoList = await getInspections('id_number = "RV-DEMO-001"')
              if (demoList && demoList.length > 0) {
                record = demoList[0]
              }
            } catch (e3) {
              console.warn('List by id_number failed, trying is_demo filter:', e3)
              try {
                const list = await getInspections('is_demo = true')
                record = list.find((i) => i.id_number === 'RV-DEMO-001') || list[0] || null
              } catch (_) {
                // Ignore and proceed
              }
            }
          }
        }

        // If backend query failed or record still empty, fallback to demo fallback record
        if (!record) {
          try {
            const all = await getInspections()
            record =
              all.find((i) => i.id_number === 'RV-DEMO-001' || i.id === '9ykaitbzexx3fy5') ||
              all[0] ||
              null
          } catch {
            /* proceed to fallback object */
          }
        }

        // Ultimate safety fallback so visitor NEVER gets an empty or broken screen
        if (!record) {
          record = {
            id: '9ykaitbzexx3fy5',
            collectionId: 'pbc_1993632484',
            collectionName: 'inspections',
            created: '2026-09-12T21:51:40.833Z',
            updated: '2026-09-12T23:27:33.664Z',
            id_number: 'RV-DEMO-001',
            date: '2026-09-12',
            time: '08:30',
            agent: 'Agente 01 — Léo',
            team: 'Equipe Tática Ambiental Setor Norte',
            location: 'Área de Proteção Ambiental — Setor Norte',
            municipality: 'Rio Claro',
            state: 'PA',
            latitude: -8.0015,
            longitude: -34.0042,
            occurrence_type: 'Desmatamento',
            description:
              'Identificação preliminar de supressão de vegetação nativa em área protegida com evidências de maquinário pesado e cortes rasos recentes.',
            notes:
              'Fiscalização realizada em atendimento a alerta satelital. Área com relevo acidentado e trilhas de acesso recente.',
            status: 'Em análise',
            is_demo: true,
          }
        }
      } else if (id.startsWith('RV-')) {
        try {
          record = await getInspectionByNumber(id)
        } catch {
          try {
            const list = await getInspections(`id_number = "${id}"`)
            if (list && list.length > 0) record = list[0]
          } catch {
            // fallback
          }
        }
      } else {
        try {
          record = await getInspectionById(id)
        } catch {
          try {
            record = await getInspectionByNumber(id)
          } catch {
            try {
              const list = await getInspections()
              const found = list.find((i) => i.id === id || i.id_number === id)
              if (found) record = found
            } catch {
              /* intentionally ignored */
            }
          }
        }
      }

      // Final fallback if still not found
      if (!record && id.includes('RV-DEMO-001')) {
        try {
          const all = await getInspections()
          record =
            all.find((i) => i.id_number === 'RV-DEMO-001' || i.id === '9ykaitbzexx3fy5') || null
        } catch {
          /* intentionally ignored */
        }
      }

      if (!record) {
        throw new Error('Fiscalização não encontrada')
      }

      setInspection(record)

      // Parallel fetch for evidences and activities with individual error safety
      const [evds, acts] = await Promise.all([
        getEvidenceByInspection(record.id).catch((err) => {
          console.warn('Failed to load evidence for inspection:', err)
          return [] as EvidenceRecord[]
        }),
        getActivitiesByInspection(record.id).catch((err) => {
          console.warn('Failed to load activities for inspection:', err)
          return [] as ActivityRecord[]
        }),
      ])

      setEvidenceList(evds)
      setActivitiesList(acts)
      return record
    })()

    try {
      const raceResult = await Promise.race([fetchPromise, timeoutPromise])
      if (raceResult === 'TIMEOUT') {
        console.warn('InspectionDetail: loadData timed out after 8s')
        setLoadError('Tempo limite excedido ao carregar os dados.')
      }
    } catch (err: any) {
      console.error('InspectionDetail error loading data:', err)
      setLoadError(err?.message || 'Falha ao carregar a fiscalização.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [targetId])

  const handleStatusChange = async (newStatus: InspectionRecord['status']) => {
    if (!inspection) return
    try {
      await updateInspection(inspection.id, { status: newStatus })
      setInspection({ ...inspection, status: newStatus })
      toast({ title: t('workspace.status_updated').replace('{status}', newStatus) })
    } catch (err) {
      toast({ title: t('workspace.status_update_error'), variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 sm:p-24 space-y-4 min-h-[400px]">
        <div className="w-10 h-10 border-3 border-[#1B5E3A] border-t-transparent rounded-full animate-spin" />
        <div className="text-xs font-semibold text-[#5B6B63] tracking-wide animate-pulse">
          {t('workspace.loading')}
        </div>
        <p className="text-[11px] text-[#5B6B63]/70 font-mono">Identificador: {targetId}</p>
      </div>
    )
  }

  if (!inspection) {
    const displayId = targetId || 'RV-DEMO-001'
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl border border-[#E2E8E4] bg-white text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-[#143028]">
          {t('workspace.not_found') || 'Fiscalização não encontrada'}
        </h2>
        <p className="text-xs text-[#5B6B63] max-w-md mx-auto leading-relaxed">
          {loadError
            ? `Ocorreu uma instabilidade: ${loadError}`
            : `O registro solicitado (${displayId}) não pôde ser carregado. Você pode tentar novamente, retornar ao início ou recarregar a demonstração interativa.`}
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            onClick={() => loadData()}
            className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold"
          >
            Tentar novamente
          </Button>
          <Link to="/">
            <Button variant="outline" size="sm" className="text-xs">
              ← Início
            </Button>
          </Link>
          <Link to="/inspections/RV-DEMO-001">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-[#0F766E] text-[#0F766E] hover:bg-teal-50"
            >
              Abrir Demo RV-DEMO-001
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isDemo = inspection.id_number === 'RV-DEMO-001' || inspection.is_demo

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Demo Context & Quick Navigation Banner (especialmente útil para visitantes da demonstração) */}
      {isDemo && (
        <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 via-emerald-50/70 to-teal-50/40 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-xs text-[#0F766E] uppercase tracking-wider">
                  {t('demo.banner_title')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-100 text-[#0F766E] font-semibold">
                  Sem cadastro • Interativo
                </span>
              </div>
              <p className="text-xs text-[#143028] leading-relaxed">{t('demo.banner_desc')}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold border-[#E2E8E4] bg-white text-[#143028] hover:bg-[#F7F9F8]"
              >
                ← {t('demo.back_to_landing')}
              </Button>
            </Link>

            <Link to="/login">
              <Button
                size="sm"
                className="h-8 text-xs font-bold bg-[#1B5E3A] hover:bg-[#14502F] text-white shadow-2xs"
              >
                {t('demo.agent_login')}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Workspace Header: Refinado com gradiente sutil verde-floresta (#F9FCFA -> #EFF5F1) e cantos arredondados consistentes */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-[#F9FCFA] to-[#EFF5F1] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#1B5E3A] bg-[#E7F2EC] px-3 py-1 rounded-xl border border-[#1B5E3A]/20 shadow-2xs">
                {inspection.id_number}
              </span>

              {/* Editable Status Select */}
              <Select
                value={inspection.status}
                onValueChange={(val: any) => handleStatusChange(val)}
              >
                <SelectTrigger className="h-7 text-xs font-semibold rounded-full border-0 bg-transparent p-0 focus:ring-0 focus:outline-none">
                  <StatusBadge status={inspection.status} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-[#E2E8E4] shadow-md">
                  <SelectItem value="Em coleta">{t('status.em_coleta')}</SelectItem>
                  <SelectItem value="Em análise">{t('status.em_analise')}</SelectItem>
                  <SelectItem value="Com pendências">{t('status.com_pendencias')}</SelectItem>
                  <SelectItem value="Pronta para relatório">
                    {t('status.pronta_relatorio')}
                  </SelectItem>
                  <SelectItem value="Finalizada">{t('status.finalizada')}</SelectItem>
                </SelectContent>
              </Select>

              {isDemo && (
                <span className="text-[11px] font-bold text-[#0F766E] bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full">
                  {t('badge.fictional_demo')}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#143028] tracking-tight">
              {inspection.location}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5B6B63]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1B5E3A]" />
                <span className="font-medium text-[#143028]">
                  {inspection.municipality} - {inspection.state}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5B6B63]" />
                <span>
                  {inspection.date} • {inspection.time}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#5B6B63]" />
                <span className="truncate">{inspection.agent}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link to={`/inspections/${inspection.id}/edit`}>
              <Button
                variant="outline"
                size="sm"
                className="h-10 text-xs font-semibold border-[#E2E8E4] bg-white hover:bg-[#F7F9F8] text-[#143028] px-3.5 rounded-xl shadow-2xs hover:shadow-xs transition-all"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1.5 text-[#5B6B63]" />
                <span>{t('workspace.edit_inspection')}</span>
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className="inline-flex items-center justify-center bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-10 px-4.5 rounded-xl shadow-sm shadow-[#1B5E3A]/20 hover:shadow-md hover:shadow-[#1B5E3A]/30 transition-all transform hover:-translate-y-0.2 active:translate-y-0"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5 text-emerald-200" />
              <span>{t('workspace.generate_report')}</span>
            </button>
          </div>
        </div>

        {/* Completeness Progress Card */}
        <div className="rounded-2xl border border-emerald-200/90 bg-[#E7F2EC]/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#1B5E3A] flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-[#1B5E3A]" />
              <span>{t('workspace.completeness_title')}: 78%</span>
            </span>
            <span className="text-[#5B6B63] text-[11px] font-medium hidden sm:inline">
              {t('workspace.completeness_advice')}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-[#E2E8E4] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1B5E3A] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: '78%' }}
            />
          </div>
        </div>

        {/* Tab Navigation (Pitch Flow: Fiscalização -> Evidências -> Linha do tempo -> Verificação -> Lacunas -> Relatório) */}
        <div className="border-t border-[#E2E8E4] pt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { key: 'overview', label: t('workspace.tabs.overview'), icon: Layers },
            {
              key: 'evidence',
              label: `${t('workspace.tabs.evidence')} (${evidenceList.length})`,
              icon: Camera,
            },
            { key: 'timeline', label: t('workspace.tabs.timeline'), icon: Clock },
            { key: 'verification', label: t('workspace.tabs.verification'), icon: SearchCheck },
            { key: 'gaps', label: t('workspace.tabs.gaps'), icon: CheckSquare },
            { key: 'report', label: t('workspace.tabs.report'), icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1B5E3A] text-white shadow-xs font-bold'
                    : 'text-[#5B6B63] hover:text-[#143028] hover:bg-white/90 border border-transparent hover:border-[#E2E8E4]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#5B6B63]'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-7 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-[#143028]">
                {t('workspace.overview_context_title')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
                {inspection.description || t('workspace.overview_no_desc')}
              </p>

              {inspection.notes && (
                <div className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#E2E8E4] text-xs space-y-1.5 mt-3">
                  <span className="font-bold text-[#143028]">
                    {t('workspace.overview_notes_title')}
                  </span>
                  <p className="text-[#5B6B63] leading-relaxed">{inspection.notes}</p>
                </div>
              )}
            </div>

            {/* Evidence Preview Strip */}
            <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#143028]">
                  {t('workspace.field_evidence_title')} ({evidenceList.length})
                </h3>
                <button
                  onClick={() => setActiveTab('evidence')}
                  className="text-xs font-semibold text-[#1B5E3A] hover:underline flex items-center gap-1 group"
                >
                  <span>{t('workspace.view_all_evidence')}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {evidenceList.slice(0, 4).map((evd) => (
                  <EvidenceCard
                    key={evd.id}
                    evidence={evd}
                    onSelect={() => navigate(`/evidence?source=${evd.code}`)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
                {t('workspace.tech_data_title')}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#5B6B63]">{t('workspace.tech_occurrence_type')}</span>
                  <div className="font-semibold text-[#0F766E] text-sm mt-0.5">
                    {inspection.occurrence_type}
                  </div>
                </div>
                <div>
                  <span className="text-[#5B6B63]">{t('workspace.tech_team')}</span>
                  <div className="font-semibold text-[#143028] mt-0.5">
                    {inspection.team || t('workspace.tech_team_unspecified')}
                  </div>
                </div>
                <div>
                  <span className="text-[#5B6B63]">{t('workspace.tech_coords')}</span>
                  <div className="font-mono font-semibold text-[#1B5E3A] bg-[#E7F2EC] px-2.5 py-1 rounded-lg mt-0.5 inline-block">
                    {inspection.latitude}, {inspection.longitude}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to Verification & Gaps */}
            <div className="rounded-3xl border border-amber-200/90 bg-gradient-to-b from-amber-50/60 to-amber-50/30 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t('workspace.quick_alert_title')}</span>
              </div>
              <p className="text-xs text-amber-950/80 leading-relaxed">
                {t('workspace.quick_alert_desc')}
              </p>
              <Button
                size="sm"
                onClick={() => setActiveTab('verification')}
                className="w-full bg-[#B45309] hover:bg-amber-800 text-white text-xs font-bold h-9 rounded-xl shadow-2xs transition-all"
              >
                {t('workspace.quick_alert_action')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evidence Center for this Inspection */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#143028]">
                {t('workspace.field_evidence_title')} ({evidenceList.length})
              </h2>
              <p className="text-xs text-[#5B6B63] mt-0.5">{t('evidence.file_help')}</p>
            </div>
            <Button
              size="sm"
              onClick={() => {
                setEditingEvidence(null)
                setModalOpen(true)
              }}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-9 px-4 rounded-xl shadow-2xs hover:shadow-xs transition-all self-start sm:self-auto"
            >
              <Camera className="w-3.5 h-3.5 mr-1.5" />
              <span>{t('workspace.add_evidence')}</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidenceList.map((evd) => (
              <EvidenceCard
                key={evd.id}
                evidence={evd}
                onSelect={(item) => navigate(`/evidence?source=${item.code}`)}
                onEdit={(item) => {
                  setEditingEvidence(item)
                  setModalOpen(true)
                }}
              />
            ))}
          </div>

          <EvidenceModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            inspectionId={inspection.id}
            evidenceToEdit={editingEvidence}
            onSave={async (data) => {
              try {
                if (editingEvidence) {
                  if (data instanceof FormData) {
                    if (!data.get('inspection')) data.set('inspection', inspection.id)
                  }
                  await updateEvidence(editingEvidence.id, data)
                  toast({
                    title: t('evidence.update_success') || 'Evidência atualizada com sucesso!',
                  })
                } else {
                  if (data instanceof FormData) {
                    if (!data.get('inspection')) data.set('inspection', inspection.id)
                    if (!data.get('code')) {
                      data.set('code', `EVD-${Math.floor(100 + Math.random() * 900)}`)
                    }
                    await createEvidence(data)
                  } else {
                    await createEvidence({
                      ...data,
                      inspection: inspection.id,
                      code: data.code || `EVD-${Math.floor(100 + Math.random() * 900)}`,
                    })
                  }
                  toast({ title: t('evidence.create_success') || 'Evidência criada com sucesso!' })
                }
              } catch (err: any) {
                console.error('InspectionDetail error saving evidence:', err)
                toast({
                  title: 'Erro ao salvar evidência',
                  description: err?.message || 'Falha ao gravar registro no banco.',
                  variant: 'destructive',
                })
                throw err
              }
              await loadData()
            }}
          />
        </div>
      )}

      {/* Tab 3: Timeline Vertical com linha conectora polida e marcadores por tipo */}
      {activeTab === 'timeline' && (
        <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#143028]">{t('timeline.title')}</h2>
            <p className="text-xs text-[#5B6B63]">{t('timeline.subtitle')}</p>
          </div>

          <div className="relative pl-7 border-l-2 border-[#1B5E3A]/25 space-y-6">
            {activitiesList.map((act, index) => (
              <div key={act.id || index} className="relative group">
                {/* Node pin com animação suave */}
                <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#1B5E3A] group-hover:bg-[#1B5E3A] group-hover:scale-110 transition-all shadow-xs" />

                <div className="p-4 rounded-2xl bg-[#F9FCFA] border border-[#E2E8E4] group-hover:border-[#1B5E3A]/40 transition-all duration-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md">
                      {act.timestamp}
                    </span>
                    <span className="text-[11px] font-medium text-[#5B6B63]">
                      {t('workspace.timeline_actor').replace('{actor}', act.actor)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#143028] leading-relaxed">
                    {act.description}
                  </p>

                  {act.linked_evidence && (
                    <div className="pt-1 border-t border-[#E2E8E4]/60">
                      <Link
                        to={`/evidence?source=${act.linked_evidence}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F766E] hover:underline group/link"
                      >
                        <span>
                          {t('workspace.timeline_view_linked')} ({act.linked_evidence})
                        </span>
                        <ChevronRight className="w-3 h-3 transition-transform group-link:translate-x-0.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Verification shortcut */}
      {activeTab === 'verification' && (
        <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#143028]">
                {t('verification.title')}
              </h2>
              <p className="text-xs text-[#5B6B63] mt-0.5">{t('verification.subtitle')}</p>
            </div>
            <Link to="/verification">
              <Button
                size="sm"
                className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-9 px-4 rounded-xl shadow-2xs"
              >
                {t('workspace.verification_card_btn')}
              </Button>
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
            {t('workspace.verification_card_desc')}
          </p>
        </div>
      )}

      {/* Tab 5: Gaps shortcut */}
      {activeTab === 'gaps' && (
        <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#143028]">{t('gaps.title')}</h2>
              <p className="text-xs text-[#5B6B63] mt-0.5">{t('gaps.subtitle')}</p>
            </div>
            <Link to="/gaps">
              <Button
                size="sm"
                className="bg-[#B45309] hover:bg-amber-800 text-white text-xs font-bold h-9 px-4 rounded-xl shadow-2xs"
              >
                {t('workspace.gaps_card_btn')}
              </Button>
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
            {t('workspace.gaps_card_desc')}
          </p>
        </div>
      )}

      {/* Tab 6: Report shortcut */}
      {activeTab === 'report' && (
        <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#143028]">{t('report.title')}</h2>
              <p className="text-xs text-[#5B6B63] mt-0.5">{t('report.draft_notice')}</p>
            </div>
            <Link to="/reports">
              <Button
                size="sm"
                className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-9 px-4 rounded-xl shadow-2xs"
              >
                {t('workspace.report_card_btn')}
              </Button>
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
            {t('workspace.report_card_desc')}
          </p>
        </div>
      )}
    </div>
  )
}
export default InspectionDetail
