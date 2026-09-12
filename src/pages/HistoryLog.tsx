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
  type ActivityRecord,
} from '@/services/dataService'
import { useRealtime } from '@/hooks/use-realtime'

export const HistoryLog: React.FC = () => {
  const { t } = useI18n()
  const [activities, setActivities] = useState<ActivityRecord[]>([])

  useRealtime('activities', () => {
    loadData()
  })

  const loadData = async () => {
    try {
      const insp = await getInspectionByNumber('RV-DEMO-001')
      const list = await getActivitiesByInspection(insp.id)
      setActivities(list)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A] mb-1">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>Trilha de Auditoria e Conformidade</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">{t('history.title')}</h1>
        <p className="text-xs text-[#5B6B63] mt-1">{t('history.subtitle')}</p>
      </div>

      {/* Activity Log List */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8E4]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B63]">
            Eventos Registrados ({activities.length})
          </span>
          <span className="text-xs text-[#0F766E] font-semibold">Caso: RV-DEMO-001</span>
        </div>

        <div className="relative pl-6 border-l-2 border-[#1B5E3A]/30 space-y-5">
          {activities.map((act) => (
            <div key={act.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#1B5E3A] group-hover:bg-[#1B5E3A] transition-colors" />

              <div className="p-3.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] hover:border-[#1B5E3A] transition-all space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#1B5E3A]">{act.timestamp}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#5B6B63]">
                    <User className="w-3 h-3" />
                    <span>{act.actor}</span>
                  </span>
                </div>

                <p className="text-xs font-medium text-[#143028]">{act.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default HistoryLog
