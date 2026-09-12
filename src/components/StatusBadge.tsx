import React from 'react'
import { useI18n } from '@/lib/i18n'

interface StatusBadgeProps {
  status: string
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const { t } = useI18n()

  const config: Record<string, { bg: string; text: string; dot: string; labelKey: string }> = {
    'Em coleta': {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      labelKey: 'status.em_coleta',
    },
    'Em análise': {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      dot: 'bg-blue-500',
      labelKey: 'status.em_analise',
    },
    'Com pendências': {
      bg: 'bg-orange-50 border-orange-200',
      text: 'text-orange-800',
      dot: 'bg-orange-500',
      labelKey: 'status.com_pendencias',
    },
    'Pronta para relatório': {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500',
      labelKey: 'status.pronta_relatorio',
    },
    Finalizada: {
      bg: 'bg-gray-100 border-gray-300',
      text: 'text-gray-800',
      dot: 'bg-gray-600',
      labelKey: 'status.finalizada',
    },
  }

  const current = config[status] || {
    bg: 'bg-gray-50 border-gray-200',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
    labelKey: status,
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg} ${current.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{t(current.labelKey)}</span>
    </span>
  )
}
