import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  FileCheck2,
  Clock,
  Camera,
  AlertCircle,
  Plus,
  PlusCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
import { getInspections, getAllEvidence, type InspectionRecord } from '@/services/dataService'
import { useRealtime } from '@/hooks/use-realtime'
import { useTour } from '@/components/TourProvider'

export const Dashboard: React.FC = () => {
  const { t } = useI18n()
  const { startTour } = useTour()

  const [inspections, setInspections] = useState<InspectionRecord[]>([])
  const [evidenceList, setEvidenceList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Subscribe in real-time to updates
  useRealtime('inspections', () => {
    loadData()
  })
  useRealtime('evidence', () => {
    loadData()
  })

  const loadData = async () => {
    try {
      const [inspList, evdList] = await Promise.all([getInspections(), getAllEvidence()])
      setInspections(inspList)
      setEvidenceList(evdList)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Live Stats calculated from real database records
  const totalInspections = inspections.length
  const inProgressCount = inspections.filter(
    (i) => i.status === 'Em análise' || i.status === 'Em coleta',
  ).length
  const evidenceCount = evidenceList.length
  // Gaps count calculated from inspections with pending status or evidence in review
  const pendingInspections = inspections.filter((i) => i.status === 'Com pendências').length
  const reviewEvidence = evidenceList.filter((e) => e.status === 'Em revisão').length
  const gapsCount = pendingInspections + reviewEvidence

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header com gradiente suave inspirado na landing page (#F9FCFA -> #EFF5F1) */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-[#F9FCFA] to-[#EFF5F1] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#1B5E3A]/25 bg-[#E7F2EC] px-3 py-0.5 text-xs font-semibold text-[#1B5E3A] shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-[#1B5E3A]" />
                <span>
                  {t('brand.name')} • {t('dashboard.tag_governance')}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8E4] bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-medium text-[#5B6B63]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                <span>{t('badge.demo')}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#143028]">
              {t('dashboard.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B63]">{t('dashboard.badge_sub')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:pt-0">
            <Button
              type="button"
              onClick={startTour}
              className="bg-[#0F766E] hover:bg-[#0d5f59] text-white text-xs font-semibold h-10 px-4 rounded-xl shadow-xs transition-all hover:shadow-sm flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>{t('tour.button_pitch')}</span>
            </Button>
            <Link to="/inspections/new">
              <Button className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-10 px-4.5 rounded-xl shadow-sm shadow-[#1B5E3A]/15 hover:shadow-md hover:shadow-[#1B5E3A]/25 transition-all flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" />
                <span>{t('dashboard.new_inspection')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards com micro-elevação suave em hover sem saltos abruptos */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Card 1: Total Fiscalizações */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-gradient-to-b from-white to-[#F9FCFA] p-5 shadow-xs transition-all duration-200 hover:border-[#1B5E3A]/60 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_inspections')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#143028] tabular-nums tracking-tight">
            {totalInspections}
          </div>
          <div className="mt-1 text-xs text-[#5B6B63] truncate">
            {t('dashboard.stat_inspections_desc')}
          </div>
        </div>

        {/* Card 2: Em andamento */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-gradient-to-b from-white to-sky-50/20 p-5 shadow-xs transition-all duration-200 hover:border-sky-400 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_in_progress')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#143028] tabular-nums tracking-tight">
            {inProgressCount}
          </div>
          <div className="mt-1 text-xs text-[#5B6B63] truncate">
            {t('dashboard.stat_in_progress_desc')}
          </div>
        </div>

        {/* Card 3: Evidências */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-gradient-to-b from-white to-emerald-50/20 p-5 shadow-xs transition-all duration-200 hover:border-[#0F766E]/70 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_evidence')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#E7F2EC] text-[#0F766E] flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#143028] tabular-nums tracking-tight">
            {evidenceCount}
          </div>
          <div className="mt-1 text-xs text-[#5B6B63] truncate">
            {t('dashboard.stat_evidence_desc')}
          </div>
        </div>

        {/* Card 4: Pendências */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-gradient-to-b from-white to-amber-50/20 p-5 shadow-xs transition-all duration-200 hover:border-[#B45309]/60 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_gaps')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#B45309] flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#143028] tabular-nums tracking-tight">
            {gapsCount}
          </div>
          <div className="mt-1 text-xs text-[#5B6B63] truncate">
            {t('dashboard.stat_gaps_desc')}
          </div>
        </div>
      </div>

      {/* Flow Pipeline Strip */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#143028] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#1B5E3A]" />
            <span>{t('dashboard.pipeline_title')}</span>
          </span>
          <span className="text-xs text-[#5B6B63] hidden sm:block">
            {t('dashboard.pipeline_subtitle')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] font-semibold border border-[#1B5E3A]/20 transition-colors">
            {t('dashboard.pipeline_step1')}
          </div>
          <div className="p-2.5 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] font-semibold border border-[#1B5E3A]/20 transition-colors">
            {t('dashboard.pipeline_step2')}
          </div>
          <div className="p-2.5 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] font-semibold border border-[#1B5E3A]/20 transition-colors">
            {t('dashboard.pipeline_step3')}
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/80 text-amber-900 font-semibold border border-amber-200 transition-colors">
            {t('dashboard.pipeline_step4')}
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50/80 text-sky-900 font-semibold border border-sky-200 transition-colors">
            {t('dashboard.pipeline_step5')}
          </div>
        </div>
      </div>

      {/* Recent Inspections List */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8E4] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#143028]">
              {t('dashboard.recent_inspections')}
            </h2>
            <p className="text-xs text-[#5B6B63]">{t('dashboard.recent_inspections_desc')}</p>
          </div>
          <Link
            to="/inspections"
            className="text-xs font-semibold text-[#1B5E3A] hover:underline flex items-center gap-1 group"
          >
            <span>{t('dashboard.view_all')}</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Inspections Table / Cards */}
        <div className="space-y-3">
          {inspections.map((insp) => {
            const isDemoCase = insp.id_number === 'RV-DEMO-001' || !!insp.is_demo
            const evidenceForInsp = evidenceList.filter((e) => e.inspection === insp.id)
            const countForInsp = evidenceForInsp.length
            const gapsForInsp = evidenceForInsp.filter((e) => e.status === 'Em revisão').length

            return (
              <div
                key={insp.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-4.5 rounded-2xl border border-[#E2E8E4] bg-white hover:border-[#1B5E3A]/60 hover:shadow-sm transition-all duration-200"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2.5 py-0.5 rounded-md border border-[#1B5E3A]/15">
                      {insp.id_number}
                    </span>
                    <StatusBadge status={insp.status} />
                    {isDemoCase && (
                      <span className="text-[10px] font-semibold text-[#0F766E] bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-md">
                        {t('badge.fictional_demo')}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-[#143028] text-sm truncate">{insp.location}</h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5B6B63]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5B6B63]" />
                      <span>
                        {insp.municipality} - {insp.state}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#5B6B63]" />
                      <span>{insp.date || '12/09/2026'}</span>
                    </span>
                    <span className="font-medium text-[#143028]">
                      {t('dashboard.stat_count_evidence').replace('{count}', String(countForInsp))}
                    </span>
                    {gapsForInsp > 0 && (
                      <span className="font-medium text-[#B45309]">
                        {t('dashboard.stat_count_review').replace('{count}', String(gapsForInsp))}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link to={`/inspections/${insp.id_number}`}>
                    <Button
                      size="sm"
                      className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-9 px-3.5 rounded-xl shadow-2xs hover:shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <span>{t('dashboard.open_inspection')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Status Legend Strip */}
      <div className="flex flex-wrap items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-[#E2E8E4] text-xs shadow-2xs">
        <span className="font-bold text-[#5B6B63] mr-1">{t('dashboard.legend_title')}:</span>
        <StatusBadge status="Em coleta" />
        <StatusBadge status="Em análise" />
        <StatusBadge status="Com pendências" />
        <StatusBadge status="Pronta para relatório" />
        <StatusBadge status="Finalizada" />
      </div>
    </div>
  )
}
export default Dashboard
