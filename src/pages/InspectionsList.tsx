import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  FileCheck2,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  Edit2,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/StatusBadge'
import { getInspections, getAllEvidence, type InspectionRecord } from '@/services/dataService'
import { useRealtime } from '@/hooks/use-realtime'

export const InspectionsList: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()

  const [inspections, setInspections] = useState<InspectionRecord[]>([])
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [loading, setLoading] = useState(true)

  useRealtime('inspections', () => {
    loadData()
  })

  const [evidenceCounts, setEvidenceCounts] = useState<Record<string, number>>({})

  const [loadError, setLoadError] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    setLoadError(null)

    const timeoutPromise = new Promise<'TIMEOUT'>((resolve) => {
      setTimeout(() => resolve('TIMEOUT'), 8000)
    })

    const fetchPromise = (async () => {
      const [list, allEvd] = await Promise.all([
        getInspections().catch((e) => {
          console.warn('InspectionsList getInspections error:', e)
          return [] as InspectionRecord[]
        }),
        getAllEvidence().catch((e) => {
          console.warn('InspectionsList getAllEvidence error:', e)
          return [] as any[]
        }),
      ])
      setInspections(list)
      const counts: Record<string, number> = {}
      allEvd.forEach((e) => {
        counts[e.inspection] = (counts[e.inspection] || 0) + 1
      })
      setEvidenceCounts(counts)
      return true
    })()

    try {
      const race = await Promise.race([fetchPromise, timeoutPromise])
      if (race === 'TIMEOUT') {
        console.warn('InspectionsList timed out after 8s')
        setLoadError('Tempo limite excedido ao carregar lista de fiscalizações.')
      }
    } catch (err: any) {
      console.error('InspectionsList loadData error:', err)
      setLoadError(err?.message || 'Falha ao carregar fiscalizações.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const statuses = [
    { key: 'ALL', label: t('inspections.all_status') },
    { key: 'Em coleta', label: t('status.em_coleta') },
    { key: 'Em análise', label: t('status.em_analise') },
    { key: 'Com pendências', label: t('status.com_pendencias') },
    { key: 'Requer validação', label: t('status.requer_validacao') },
    { key: 'Pronta para relatório', label: t('status.pronta_relatorio') },
    { key: 'Minuta gerada', label: t('status.minuta_gerada') },
    { key: 'Finalizada', label: t('status.finalizada') },
  ]

  const filtered = inspections.filter((insp) => {
    const matchesStatus = selectedStatus === 'ALL' || insp.status === selectedStatus
    const term = search.toLowerCase()
    const matchesSearch =
      insp.id_number.toLowerCase().includes(term) ||
      insp.location.toLowerCase().includes(term) ||
      insp.agent.toLowerCase().includes(term) ||
      insp.municipality.toLowerCase().includes(term)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">
            {t('inspections.title')}
          </h1>
          <p className="text-xs text-[#5B6B63] mt-1">
            Gerencie todas as fiscalizações, organize evidências e acompanhe o status de cada
            processo.
          </p>
        </div>

        <Link to="/inspections/new">
          <Button className="min-h-[44px] bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold px-4 rounded-xl shadow-xs flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A]">
            <Plus className="w-4 h-4" />
            <span>{t('inspections.new')}</span>
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border border-[#E2E8E4] bg-white shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5B6B63]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('inspections.search_placeholder')}
            className="pl-9 h-9 text-xs border-[#E2E8E4] bg-[#F7F9F8] focus-visible:ring-[#1B5E3A]"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {statuses.map((s) => (
            <button
              key={s.key}
              onClick={() => setSelectedStatus(s.key)}
              aria-pressed={selectedStatus === s.key}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A] ${
                selectedStatus === s.key
                  ? 'bg-[#1B5E3A] text-white shadow-2xs hover:bg-[#14502F]'
                  : 'bg-[#F7F9F8] text-[#5B6B63] border border-[#E2E8E4] hover:text-[#143028] hover:bg-[#E2E8E4]/50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((insp) => {
          const isDemo = insp.id_number === 'RV-DEMO-001' || insp.is_demo

          return (
            <div
              key={insp.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-xs hover:border-[#1B5E3A] hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md">
                    {insp.id_number}
                  </span>
                  <StatusBadge status={insp.status} />
                </div>

                <div>
                  <h3 className="font-bold text-[#143028] text-base group-hover:text-[#1B5E3A] transition-colors line-clamp-1">
                    {insp.location}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-[#5B6B63] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {insp.municipality} - {insp.state}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F7F9F8] border border-[#E2E8E4] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#5B6B63]">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="truncate max-w-[150px]">{insp.agent}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{insp.date || '12/09/2026'}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#0F766E]">{insp.occurrence_type}</span>
                    <span className="font-medium text-[#143028]">
                      {evidenceCounts[insp.id] ?? (isDemo ? 14 : 0)} evidências
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E2E8E4] flex items-center justify-between gap-2">
                <Link to={`/inspections/${insp.id}/edit`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="min-h-[44px] px-3 text-xs font-bold text-[#5B6B63] hover:text-[#143028] rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A]"
                  >
                    <Edit2 className="w-4 h-4 mr-1.5" />
                    <span>{t('inspections.edit')}</span>
                  </Button>
                </Link>

                <Link to={`/inspections/${insp.id_number}`}>
                  <Button
                    size="sm"
                    className="min-h-[44px] bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold px-3.5 rounded-xl shadow-xs flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A]"
                  >
                    <span>{t('dashboard.open_inspection')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 space-y-3">
            <div className="w-8 h-8 border-3 border-[#1B5E3A] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[#5B6B63] font-semibold">{t('workspace.loading')}</span>
          </div>
        )}

        {!loading && loadError && (
          <div className="col-span-full p-8 text-center rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3">
            <p className="text-xs text-amber-900 font-medium">{loadError}</p>
            <Button
              size="sm"
              onClick={() => loadData()}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs"
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {!loading && !loadError && filtered.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-[#E2E8E4] bg-white">
            <p className="text-sm font-medium text-[#5B6B63]">{t('inspections.empty')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default InspectionsList
