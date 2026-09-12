import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  FileCheck2,
  Clock,
  Camera,
  AlertCircle,
  Plus,
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
  const { t, language } = useI18n()
  const navigate = useNavigate()
  const { startTour } = useTour()

  const [inspections, setInspections] = useState<InspectionRecord[]>([])  const [evidenceList, setEvidenceList] = useState<any[]>([])
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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A] mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('brand.name')} • Governança &amp; Fiscalização</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">{t('dashboard.title')}</h1>
          <p className="text-xs text-[#5B6B63] mt-0.5">
            {t('badge.demo')} • Painel integrado de controle operacional
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={startTour}
            className="bg-[#0F766E] hover:bg-[#0d5f59] text-white text-xs font-semibold h-9 px-3.5 rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>{t('tour.button_pitch')}</span>
          </Button>
          <Link to="/inspections/new">
            <Button className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-9 px-4 rounded-xl shadow-xs">
              <PlusCircle className="w-4 h-4 mr-1.5" />
              <span>{t('dashboard.new_inspection')}</span>
            </Button>
          </Link>
        </div>      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Inspections */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-[#1B5E3A]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_inspections')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-[#143028] tabular-nums tracking-tight">
            {totalInspections}
          </div>
          <div className="mt-1 text-[11px] text-[#5B6B63] flex items-center gap-1">
            <span>Todas as operações registradas</span>
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-blue-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_in_progress')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-[#143028] tabular-nums tracking-tight">
            {inProgressCount}
          </div>
          <div className="mt-1 text-[11px] text-[#5B6B63]">
            <span>Operações em coleta ou análise</span>
          </div>
        </div>

        {/* Card 3: Evidence */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-[#0F766E]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_evidence')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E7F2EC] text-[#0F766E] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-[#143028] tabular-nums tracking-tight">
            {evidenceCount}
          </div>
          <div className="mt-1 text-[11px] text-[#5B6B63]">
            <span>Registros e documentos vinculados</span>
          </div>
        </div>

        {/* Card 4: Gaps */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-[#B45309]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
              {t('dashboard.stat_gaps')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#B45309] flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-[#143028] tabular-nums tracking-tight">
            {gapsCount}
          </div>
          <div className="mt-1 text-[11px] text-[#5B6B63]">
            <span>Pontos requerendo complementação</span>
          </div>
        </div>
      </div>

      {/* Flow Pipeline Banner */}
      <div className="rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#143028] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#1B5E3A]" />
            <span>{t('dashboard.pipeline_title')}</span>
          </span>
          <span className="text-[11px] text-[#5B6B63]">
            Rastreabilidade contínua de ponta a ponta
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] font-medium border border-[#1B5E3A]/20">
            1. Fiscalização
          </div>
          <div className="p-2.5 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] font-medium border border-[#1B5E3A]/20">
            2. Evidências
          </div>
          <div className="p-2.5 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] font-medium border border-[#1B5E3A]/20">
            3. Verificação
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 font-medium border border-amber-200">
            4. Lacunas
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-800 font-medium border border-blue-200">
            5. Relatório
          </div>
        </div>
      </div>

      {/* Recent Inspections List */}
      <div className="rounded-2xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8E4] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#143028]">
              {t('dashboard.recent_inspections')}
            </h2>
            <p className="text-xs text-[#5B6B63]">
              Acesse diretamente os dossiês de fiscalização e suas evidências
            </p>
          </div>
          <Link
            to="/inspections"
            className="text-xs font-semibold text-[#1B5E3A] hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-3.5 h-3.5" />
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
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#E2E8E4] bg-white hover:border-[#1B5E3A] hover:shadow-xs transition-all"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md">
                      {insp.id_number}
                    </span>
                    <StatusBadge status={insp.status} />
                    {isDemoCase && (
                      <span className="text-[10px] font-semibold text-[#0F766E] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                        {t('badge.fictional_demo')}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-[#143028] text-sm truncate">{insp.location}</h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5B6B63]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#5B6B63]" />
                      <span>
                        {insp.municipality} - {insp.state}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#5B6B63]" />
                      <span>{insp.date || '12/09/2026'}</span>
                    </span>
                    <span className="font-medium text-[#143028]">{countForInsp} evidências</span>
                    <span className="font-medium text-[#B45309]">{gapsForInsp} em revisão</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link to={`/inspections/${insp.id_number}`}>
                    <Button
                      size="sm"
                      className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-8 px-3 rounded-lg shadow-xs flex items-center gap-1.5"
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
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-[#E2E8E4] text-xs">
        <span className="font-semibold text-[#5B6B63] mr-2">Legenda de Status:</span>
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
