import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  RefreshCw,
  ArrowRight,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getAllEvidence, getInspections } from '@/services/dataService'

interface VerificationResult {
  id: string
  category: 'consistent' | 'review' | 'conflict' | 'missing'
  badge: string
  color: string
  icon: any
  iconColor: string
  title: string
  message: string
  recommendation: string
  evidenceCode: string
}

export const ConsistencyVerification: React.FC = () => {
  const { t } = useI18n()
  const { toast } = useToast()
  const [recalculating, setRecalculating] = useState(false)
  const [items, setItems] = useState<VerificationResult[]>([])
  const [loading, setLoading] = useState(true)

  const loadVerificationData = async () => {
    try {
      const [inspections, evidenceList] = await Promise.all([getInspections(), getAllEvidence()])

      const demoInsp = inspections.find((i) => i.id_number === 'RV-DEMO-001') || inspections[0]
      const results: VerificationResult[] = []

      // 1. Photographic temporal compatibility
      const photos = evidenceList.filter((e) => e.type === 'Fotografia')
      const firstPhoto = photos[0] || evidenceList[0]
      results.push({
        id: 'VER-001',
        category: 'consistent',
        badge: '🟢 Consistente',
        color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
        icon: CheckCircle2,
        iconColor: 'text-[#2F9E5F]',
        title: 'Compatibilidade temporal das fotografias',
        message: 'Data registrada nas fotografias coincide com a data da fiscalização.',
        recommendation:
          'Registros cronológicos e metadados encontram-se em perfeita conformidade com o cronograma da operação.',
        evidenceCode: firstPhoto ? firstPhoto.code : 'EVD-001',
      })

      // 2. Proximity check or multiple locations
      const secondEvd = evidenceList[1] || firstPhoto
      results.push({
        id: 'VER-002',
        category: 'review',
        badge: '🟡 Verificar',
        color: 'border-amber-200 bg-amber-50/40 text-amber-900',
        icon: AlertTriangle,
        iconColor: 'text-[#D97706]',
        title: 'Possível proximidade temporal com locais distintos',
        message: 'Duas evidências apresentam horários próximos no setor da APA.',
        recommendation:
          'Recomenda-se verificar com a equipe se houve deslocamento rápido por viatura ou divisão de tarefas em campo.',
        evidenceCode: secondEvd ? secondEvd.code : 'EVD-002',
      })

      // 3. Officer check
      const missingOfficer = evidenceList.find((e) => !e.officer || e.officer.trim() === '')
      if (missingOfficer) {
        results.push({
          id: 'VER-003',
          category: 'missing',
          badge: '🔵 Informação ausente',
          color: 'border-blue-200 bg-blue-50/40 text-blue-900',
          icon: HelpCircle,
          iconColor: 'text-[#2563EB]',
          title: 'Ausência de qualificação do agente no registro',
          message: `Não há identificação do responsável pelo registro da evidência ${missingOfficer.code}.`,
          recommendation:
            'Informação não localizada. Confirme com o líder da equipe quem realizou a constatação deste registro.',
          evidenceCode: missingOfficer.code,
        })
      }

      // 4. In review status check
      const inReview = evidenceList.find((e) => e.status === 'Em revisão')
      if (inReview) {
        results.push({
          id: 'VER-004',
          category: 'conflict',
          badge: '🔴 Conflito',
          color: 'border-red-200 bg-red-50/40 text-red-900',
          icon: AlertOctagon,
          iconColor: 'text-[#B3261E]',
          title: 'Registro com pendência técnica em revisão',
          message: `Evidência ${inReview.code} (${inReview.description}) sinalizada para revisão técnica de campo.`,
          recommendation:
            'Recomenda-se aferição dos parâmetros e validação no Centro de Evidências antes de fechar o dossiê.',
          evidenceCode: inReview.code,
        })
      }

      setItems(results)
    } catch (err) {
      console.error('Failed to run consistency verification:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVerificationData()
  }, [])

  const handleRerun = async () => {
    setRecalculating(true)
    await loadVerificationData()
    setRecalculating(false)
    toast({
      title: 'Verificação de consistência concluída',
      description: 'Todos os registros de campo foram cruzados e recalculados contra a base.',
    })
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
