import React from 'react'
import { useI18n } from '@/lib/i18n'

interface StatusBadgeProps {
  status: string
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const { t } = useI18n()

  const config: Record<
    string,
    { bg: string; text: string; dot: string; border: string; labelKey: string }
  > = {
    'Em coleta': {
      bg: 'bg-amber-50/90',
      border: 'border-amber-200/80',
      text: 'text-amber-900',
      dot: 'bg-amber-500 ring-2 ring-amber-100',
      labelKey: 'status.em_coleta',
    },
    'Em análise': {
      bg: 'bg-sky-50/90',
      border: 'border-sky-200/80',
      text: 'text-sky-900',
      dot: 'bg-sky-500 ring-2 ring-sky-100',
      labelKey: 'status.em_analise',
    },
    'Com pendências': {
      bg: 'bg-orange-50/90',
      border: 'border-orange-200/80',
      text: 'text-orange-900',
      dot: 'bg-orange-500 ring-2 ring-orange-100',
      labelKey: 'status.com_pendencias',
    },
    'Pronta para relatório': {
      bg: 'bg-emerald-50/90',
      border: 'border-emerald-200/80',
      text: 'text-emerald-900',
      dot: 'bg-emerald-500 ring-2 ring-emerald-100',
      labelKey: 'status.pronta_relatorio',
    },
    Finalizada: {
      bg: 'bg-slate-100/90',
      border: 'border-slate-300/80',
      text: 'text-slate-800',
      dot: 'bg-slate-600 ring-2 ring-slate-200',
      labelKey: 'status.finalizada',
    },
  }

  const current = config[status] || {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-700',
    dot: 'bg-slate-400 ring-2 ring-slate-100',
    labelKey: status,
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-tight border transition-colors ${current.bg} ${current.border} ${current.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} aria-hidden="true" />
      <span className="truncate">{t(current.labelKey)}</span>
    </span>
  )
}
