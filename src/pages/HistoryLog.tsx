import React, { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'
import {
  History as HistoryIcon,
  Clock,
  User,
  Shield,
  FileCheck2,
  Filter,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import {
  getInspectionByNumber,
  getActivitiesByInspection,
  getAllActivities,
  type ActivityRecord,
} from '@/services/dataService'
import { useRealtime } from '@/hooks/use-realtime'

export const HistoryLog: React.FC = () => {
  const { t } = useI18n()
  const [activities, setActivities] = useState<ActivityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useRealtime('activities', () => {
    loadData()
  })

  const loadData = async () => {
    setLoading(true)
    setLoadError(null)

    const timeoutPromise = new Promise<'TIMEOUT'>((resolve) => {
      setTimeout(() => resolve('TIMEOUT'), 8000)
    })

    const fetchPromise = (async () => {
      let list: ActivityRecord[] = []
      try {
        const insp = await getInspectionByNumber('RV-DEMO-001').catch(() => null)
        if (insp) {
          list = await getActivitiesByInspection(insp.id).catch(() => [])
        } else {
          list = await getAllActivities().catch(() => [])
        }
      } catch (e) {
        list = await getAllActivities().catch(() => [])
      }
      setActivities(list)
      return true
    })()

    try {
      const race = await Promise.race([fetchPromise, timeoutPromise])
      if (race === 'TIMEOUT') {
        console.warn('HistoryLog timed out after 8s')
        setLoadError('Tempo limite excedido ao carregar trilha de eventos.')
      }
    } catch (err: any) {
      console.error('HistoryLog loadData error:', err)
      setLoadError(err?.message || 'Falha ao carregar eventos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A] px-3 py-1 rounded-full bg-[#E7F2EC] border border-[#1B5E3A]/20">
          <Shield className="w-3.5 h-3.5" />
          <span>{t('audit.trail_label')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">{t('history.title')}</h1>
        <p className="text-xs text-[#5B6B63]">{t('audit.trail_desc')}</p>
      </div>

      {/* Activity Log List */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8E4]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B63] flex items-center gap-1.5">
            <HistoryIcon className="w-3.5 h-3.5 text-[#1B5E3A]" />
            <span>
              {t('audit.trail_label')} ({activities.length})
            </span>
          </span>
          <span className="text-xs text-[#0F766E] font-semibold">
            Caso: RV-DEMO-001 ({t('badge.demo')})
          </span>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center p-12 space-y-3">
            <div className="w-8 h-8 border-3 border-[#1B5E3A] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[#5B6B63] font-semibold">{t('workspace.loading')}</span>
          </div>
        )}

        {!loading && loadError && (
          <div className="p-6 text-center rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2">
            <p className="text-xs text-amber-900 font-medium">{loadError}</p>
            <button
              type="button"
              onClick={() => loadData()}
              className="text-xs font-bold text-[#1B5E3A] underline"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !loadError && (
          <div className="relative pl-6 border-l-2 border-[#1B5E3A]/30 space-y-5">
            {activities.map((act) => (
              <div key={act.id} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#1B5E3A] group-hover:bg-[#1B5E3A] transition-colors" />

                <div className="p-3.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] hover:border-[#1B5E3A] transition-all space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#1B5E3A] bg-white px-2 py-0.5 rounded border border-[#E2E8E4]">
                      {act.timestamp}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#143028] font-semibold bg-[#E7F2EC] px-2 py-0.5 rounded">
                      <User className="w-3.5 h-3.5 text-[#1B5E3A]" />
                      <span>{act.actor}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-[#143028] pt-1">
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default HistoryLog
