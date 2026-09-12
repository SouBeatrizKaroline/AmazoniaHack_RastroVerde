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
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

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

  const loadData = async () => {
    if (!id) return
    try {
      let record: InspectionRecord
      if (id.startsWith('RV-')) {
        record = await getInspectionByNumber(id)
      } else {
        record = await getInspectionById(id)
      }
      setInspection(record)

      const [evds, acts] = await Promise.all([
        getEvidenceByInspection(record.id),
        getActivitiesByInspection(record.id),
      ])
      setEvidenceList(evds)
      setActivitiesList(acts)
    } catch (err) {
      console.error(err)
      toast({ title: 'Fiscalização não localizada.', variant: 'destructive' })
      navigate('/inspections')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  const handleStatusChange = async (newStatus: InspectionRecord['status']) => {
    if (!inspection) return
    try {
      await updateInspection(inspection.id, { status: newStatus })
      setInspection({ ...inspection, status: newStatus })
      toast({ title: `Status atualizado para: ${newStatus}` })
    } catch (err) {
      toast({ title: 'Erro ao alterar status', variant: 'destructive' })
    }
  }

  if (loading || !inspection) {
    return (
      <div className="p-12 text-center text-xs font-semibold text-[#5B6B63]">
        Carregando dados da fiscalização...
      </div>
    )
  }

  const isDemo = inspection.id_number === 'RV-DEMO-001' || inspection.is_demo

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Workspace Header */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-[#1B5E3A] bg-[#E7F2EC] px-3 py-1 rounded-md">
                {inspection.id_number}
              </span>

              {/* Editable Status Select */}
              <Select
                value={inspection.status}
                onValueChange={(val: any) => handleStatusChange(val)}
              >
                <SelectTrigger className="h-7 text-xs font-semibold rounded-full border-0 bg-transparent p-0 focus:ring-0">
                  <StatusBadge status={inspection.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Em coleta">Em coleta</SelectItem>
                  <SelectItem value="Em análise">Em análise</SelectItem>
                  <SelectItem value="Com pendências">Com pendências</SelectItem>
                  <SelectItem value="Pronta para relatório">Pronta para relatório</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                </SelectContent>
              </Select>

              {isDemo && (
                <span className="text-xs font-bold text-[#0F766E] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                  {t('badge.fictional_demo')}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#143028]">{inspection.location}</h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5B6B63]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {inspection.municipality} - {inspection.state}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {inspection.date} às {inspection.time}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{inspection.agent}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/inspections/${inspection.id}/edit`}>
              <Button variant="outline" size="sm" className="h-9 text-xs border-[#E2E8E4]">
                <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                <span>{t('workspace.edit_inspection')}</span>
              </Button>
            </Link>

            <Link to="/reports">
              <Button
                size="sm"
                className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-9 px-4 rounded-lg shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                <span>{t('workspace.generate_report')}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Completeness Progress Card */}
        <div className="rounded-2xl border border-emerald-200 bg-[#E7F2EC]/40 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#1B5E3A] flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4" />
              <span>{t('workspace.completeness_title')}: 78%</span>
            </span>
            <span className="text-[#5B6B63] text-[11px]">{t('workspace.completeness_advice')}</span>
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
        <div className="border-t border-[#E2E8E4] pt-2 flex items-center gap-1 overflow-x-auto pb-1">
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1B5E3A] text-white shadow-xs'
                    : 'text-[#5B6B63] hover:text-[#143028] hover:bg-[#F7F9F8]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
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
            <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#143028]">
                Contextualização e Fatos Observados
              </h2>
              <p className="text-xs text-[#5B6B63] leading-relaxed">
                {inspection.description || 'Nenhuma descrição inicial registrada.'}
              </p>

              {inspection.notes && (
                <div className="p-3.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-xs space-y-1">
                  <span className="font-semibold text-[#143028]">
                    Observações Complementares da Equipe:
                  </span>
                  <p className="text-[#5B6B63]">{inspection.notes}</p>
                </div>
              )}
            </div>

            {/* Evidence Preview Strip */}
            <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#143028]">
                  Evidências Coletadas em Campo ({evidenceList.length})
                </h3>
                <button
                  onClick={() => setActiveTab('evidence')}
                  className="text-xs font-semibold text-[#1B5E3A] hover:underline flex items-center gap-1"
                >
                  <span>Ver todas</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <div className="rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
                Dados Técnicos
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#5B6B63]">Tipo de Ocorrência:</span>
                  <div className="font-semibold text-[#0F766E]">{inspection.occurrence_type}</div>
                </div>
                <div>
                  <span className="text-[#5B6B63]">Equipe Responsável:</span>
                  <div className="font-semibold text-[#143028]">
                    {inspection.team || 'Não informada'}
                  </div>
                </div>
                <div>
                  <span className="text-[#5B6B63]">Coordenadas de Referência:</span>
                  <div className="font-mono font-semibold text-[#1B5E3A]">
                    {inspection.latitude}, {inspection.longitude}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to Verification & Gaps */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
                <AlertTriangle className="w-4 h-4" />
                <span>Atenção: 3 Pendências e 1 Inconsistência</span>
              </div>
              <p className="text-xs text-amber-900/80">
                O sistema identificou possíveis divergências de coordenadas e documentos dominiais
                ausentes.
              </p>
              <Button
                size="sm"
                onClick={() => setActiveTab('verification')}
                className="w-full bg-[#B45309] hover:bg-amber-800 text-white text-xs font-semibold h-8 rounded-lg"
              >
                Verificar Integridade do Caso
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evidence Center for this Inspection */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#143028]">
              Registros e Evidências da Vistoria ({evidenceList.length})
            </h2>
            <Button
              size="sm"
              onClick={() => {
                setEditingEvidence(null)
                setModalOpen(true)
              }}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-8 px-3 rounded-lg"
            >
              Adicionar Evidência
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
                  await updateEvidence(editingEvidence.id, data)
                  toast({ title: t('evidence.update_success') || 'Evidência atualizada' })
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
                  toast({ title: t('evidence.create_success') || 'Evidência criada com sucesso' })
                }
              } catch (err: any) {
                console.error(err)
                toast({
                  title: 'Erro ao salvar evidência',
                  description: err?.message,
                  variant: 'destructive',
                })
              }
              loadData()
            }}
          />
        </div>
      )}

      {/* Tab 3: Timeline */}
      {activeTab === 'timeline' && (
        <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#143028]">{t('timeline.title')}</h2>
            <p className="text-xs text-[#5B6B63] mt-0.5">{t('timeline.subtitle')}</p>
          </div>

          <div className="relative pl-6 border-l-2 border-[#1B5E3A]/30 space-y-6">
            {activitiesList.map((act, index) => (
              <div key={act.id || index} className="relative group">
                {/* Node pin */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#1B5E3A] group-hover:bg-[#1B5E3A] transition-colors" />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B5E3A]">
                      {act.timestamp}
                    </span>
                    <span className="text-[11px] font-medium text-[#5B6B63]">por {act.actor}</span>
                  </div>

                  <p className="text-xs font-semibold text-[#143028]">{act.description}</p>

                  {act.linked_evidence && (
                    <div className="pt-1">
                      <Link
                        to={`/evidence?source=${act.linked_evidence}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F766E] hover:underline"
                      >
                        <span>Ver evidência vinculada</span>
                        <ChevronRight className="w-3 h-3" />
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
        <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#143028]">{t('verification.title')}</h2>
              <p className="text-xs text-[#5B6B63]">{t('verification.subtitle')}</p>
            </div>
            <Link to="/verification">
              <Button size="sm" className="bg-[#1B5E3A] text-white text-xs">
                Abrir Painel Completo de Verificação
              </Button>
            </Link>
          </div>
          <p className="text-xs text-[#5B6B63]">
            Acesse a tela dedicada para analisar cruzamentos detalhados de dados, horários,
            coordenadas e inconsistências identificadas automaticamente.
          </p>
        </div>
      )}

      {/* Tab 5: Gaps shortcut */}
      {activeTab === 'gaps' && (
        <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#143028]">{t('gaps.title')}</h2>
              <p className="text-xs text-[#5B6B63]">{t('gaps.subtitle')}</p>
            </div>
            <Link to="/gaps">
              <Button size="sm" className="bg-[#B45309] text-white text-xs">
                Abrir Checklist de Pendências
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Tab 6: Report shortcut */}
      {activeTab === 'report' && (
        <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#143028]">{t('report.title')}</h2>
              <p className="text-xs text-[#5B6B63]">{t('report.draft_notice')}</p>
            </div>
            <Link to="/reports">
              <Button size="sm" className="bg-[#1B5E3A] text-white text-xs">
                Abrir Gerador de Relatório
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
export default InspectionDetail
