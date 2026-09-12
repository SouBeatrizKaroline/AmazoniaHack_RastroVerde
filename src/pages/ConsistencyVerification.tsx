import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  SearchCheck,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export const ConsistencyVerification: React.FC = () => {
  const { t } = useI18n()
  const { toast } = useToast()
  const [recalculating, setRecalculating] = useState(false)

  // Seeded Verification items for RV-DEMO-001 (strictly cautious language)
  const items = [
    {
      id: 'VER-001',
      category: 'consistent',
      badge: '🟢 Consistente',
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
      icon: CheckCircle2,
      iconColor: 'text-[#2F9E5F]',
      title: 'Compatibilidade temporal das fotografias',
      message: 'Data registrada nas fotografias coincide com a data da fiscalização.',
      recommendation:
        'Registros cronológicos e metadados EXIF encontram-se em perfeita conformidade com o cronograma da operação.',
      evidenceCode: 'EVD-014',
    },
    {
      id: 'VER-002',
      category: 'review',
      badge: '🟡 Verificar',
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-[#D97706]',
      title: 'Possível proximidade temporal com locais distintos',
      message: 'Duas evidências apresentam horários muito próximos, mas localizações distintas.',
      recommendation:
        'Recomenda-se verificar com a equipe se houve deslocamento rápido por viatura ou divisão de tarefas em campo.',
      evidenceCode: 'EVD-015',
    },
    {
      id: 'VER-003',
      category: 'conflict',
      badge: '🔴 Conflito',
      color: 'border-red-200 bg-red-50/40 text-red-900',
      icon: AlertOctagon,
      iconColor: 'text-[#B3261E]',
      title: 'Possível divergência entre anotação e coordenadas',
      message:
        'A localização descrita na anotação não corresponde às coordenadas registradas na evidência.',
      recommendation:
        'Recomenda-se aferição da coordenada exata do acampamento com o receptor GNSS antes de concluir o dossiê.',
      evidenceCode: 'EVD-018',
    },
    {
      id: 'VER-004',
      category: 'missing',
      badge: '🔵 Informação ausente',
      color: 'border-blue-200 bg-blue-50/40 text-blue-900',
      icon: HelpCircle,
      iconColor: 'text-[#2563EB]',
      title: 'Ausência de qualificação do agente no registro',
      message: 'Não há identificação do responsável pelo registro da evidência EVD-008.',
      recommendation:
        'Informação não localizada. Confirme com o líder da equipe quem realizou a constatação da marca de motosserra.',
      evidenceCode: 'EVD-008',
    },
  ]

  const handleRerun = () => {
    setRecalculating(true)
    setTimeout(() => {
      setRecalculating(false)
      toast({
        title: 'Verificação de consistência concluída',
        description: 'Todos os registros de campo foram cruzados e recalculados.',
      })
    }, 600)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">
            {t('verification.title')}
          </h1>
          <p className="text-xs text-[#5B6B63] mt-1">{t('verification.subtitle')}</p>
        </div>

        <Button
          onClick={handleRerun}
          disabled={recalculating}
          className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-9 px-4 rounded-lg shadow-xs flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${recalculating ? 'animate-spin' : ''}`} />
          <span>{t('verification.rerun')}</span>
        </Button>
      </div>

      {/* Cautious Language Banner */}
      <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50 text-xs text-blue-900 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Postura Técnica e Cautelosa da Plataforma</span>
          <p className="text-blue-800 leading-relaxed">
            {t('verification.cautious_notice')} Termos como "Possível inconsistência", "Recomenda-se
            verificar" e "Informação não localizada" garantem a segurança jurídica do procedimento.
          </p>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl border border-[#E2E8E4] bg-white text-xs">
        <span className="font-bold text-[#5B6B63] mr-2">Categorias de Análise:</span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
          🟢 {t('verification.consistent')}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold border border-amber-200">
          🟡 {t('verification.review')}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-50 text-red-800 font-semibold border border-red-200">
          🔴 {t('verification.conflict')}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-semibold border border-blue-200">
          🔵 {t('verification.missing')}
        </span>
      </div>

      {/* Result Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 ${item.color} bg-white transition-all hover:shadow-md`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{item.badge}</span>
                  <span className="font-mono text-[11px] font-semibold text-[#5B6B63]">
                    {item.id}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${item.iconColor}`} />
                  <div>
                    <h3 className="font-bold text-sm text-[#143028]">{item.title}</h3>
                    <p className="text-xs font-medium text-[#143028] mt-1">"{item.message}"</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-[11px] text-[#5B6B63] space-y-1">
                  <span className="font-semibold text-[#143028]">Recomendação técnica:</span>
                  <p>{item.recommendation}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8E4] flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded">
                  Ref: {item.evidenceCode}
                </span>

                <Link
                  to={`/evidence?source=${item.evidenceCode}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1B5E3A] hover:underline"
                >
                  <span>{t('verification.go_to_evidence')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default ConsistencyVerification
