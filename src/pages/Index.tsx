import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  Compass,
  Camera,
  Search,
  Puzzle,
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Layers,
  FileSearch,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Index: React.FC = () => {
  const { t } = useI18n()

  const flowSteps = [
    {
      step: '01',
      icon: MapPin,
      label: t('landing.flow_field'),
      desc: 'Fixação de marco georreferenciado e vistoria inicial',
    },
    {
      step: '02',
      icon: Camera,
      label: t('landing.flow_evidence'),
      desc: 'Fotos, coordenadas, áudios e depoimentos coletados',
    },
    {
      step: '03',
      icon: Search,
      label: t('landing.flow_verification'),
      desc: 'Cruzamento de dados, horários e coerência espacial',
    },
    {
      step: '04',
      icon: Puzzle,
      label: t('landing.flow_gaps'),
      desc: 'Identificação inteligente de dados ausentes e pendências',
    },
    {
      step: '05',
      icon: FileText,
      label: t('landing.flow_report'),
      desc: 'Elaboração do relatório com rastreabilidade direta',
    },
  ]

  const problemSources = [
    'Fotografias em celulares e câmeras',
    'Anotações manuais de campo em prancheta',
    'Coordenadas de pontos de GPS dispersas',
    'Documentos de propriedade e CAR em papel',
    'Depoimentos e relatos verbais informais',
    'Autos de infração e laudos parciais',
    'Observações técnicas preliminares',
  ]

  const risks = [
    t('landing.risk_forgotten'),
    t('landing.risk_context'),
    t('landing.risk_inconsistencies'),
    t('landing.risk_duplications'),
    t('landing.risk_gaps'),
  ]

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-white to-[#F7F9F8] p-8 sm:p-12 lg:p-16 shadow-xs">
        {/* Subtle topographical SVG background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topo" width="100" height="100" patternUnits="userSpaceOnUse">
                <path
                  d="M0 50 Q 25 20, 50 50 T 100 50"
                  fill="none"
                  stroke="#1B5E3A"
                  strokeWidth="2"
                />
                <path
                  d="M0 25 Q 25 -5, 50 25 T 100 25"
                  fill="none"
                  stroke="#1B5E3A"
                  strokeWidth="1.5"
                />
                <path
                  d="M0 75 Q 25 45, 50 75 T 100 75"
                  fill="none"
                  stroke="#1B5E3A"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          {/* Eyebrows */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1B5E3A]/20 bg-[#E7F2EC] px-3.5 py-1 text-xs font-semibold text-[#1B5E3A]">
              <Compass className="w-3.5 h-3.5" />
              <span>RastroVerde • GovTech Ambiental</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8E4] bg-white/90 backdrop-blur-xs px-3.5 py-1 text-xs font-medium text-[#5B6B63] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
              <span>{t('landing.amazoniahack_badge')}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#143028] leading-[1.15]">
            {t('landing.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#5B6B63] max-w-2xl mx-auto leading-relaxed">
            {t('landing.subheadline')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/inspections/new" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#1B5E3A] hover:bg-[#14502F] text-white font-semibold shadow-md px-6 h-12 rounded-xl flex items-center justify-center gap-2"
              >
                <span>{t('landing.start_inspection')}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/inspections/RV-DEMO-001" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-[#E2E8E4] bg-white text-[#143028] hover:bg-[#F7F9F8] hover:border-[#1B5E3A] font-semibold h-12 px-6 rounded-xl shadow-xs"
              >
                <span>{t('landing.view_demo')}</span>
                <span className="ml-1 text-xs font-normal text-[#5B6B63]">(RV-DEMO-001)</span>
              </Button>
            </Link>
          </div>

          <div className="pt-2">
            <span className="inline-block text-xs text-[#5B6B63]">{t('brand.tagline')}</span>
          </div>
        </div>

        {/* Visual Animated Flow Strip: Campo -> Evidências -> Verificação -> Lacunas -> Relatório */}
        <div className="relative z-10 mt-14 pt-8 border-t border-[#E2E8E4]">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-[#5B6B63] mb-6">
            Fluxo Contínuo de Rastreabilidade
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {flowSteps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1B5E3A] hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#0F766E] mb-1">
                    {step.step}
                  </div>
                  <div className="text-sm font-bold text-[#143028]">{step.label}</div>
                  <div className="text-xs text-[#5B6B63] mt-1 line-clamp-2">{step.desc}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center pt-8">
          <ChevronDown className="w-5 h-5 text-[#5B6B63] animate-bounce" />
        </div>
      </section>

      {/* "O Problema" Section */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B45309]">
            <AlertTriangle className="w-4 h-4" />
            <span>O Cenário Real em Campo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#143028] mt-1">
            {t('landing.problem_title')}
          </h2>
          <p className="text-[#5B6B63] text-sm sm:text-base mt-2">{t('landing.problem_desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scattered Sources Card */}
          <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-[#143028] text-base">
              <Layers className="w-5 h-5 text-[#0F766E]" />
              <span>Fontes e Registros Espalhados</span>
            </div>
            <p className="text-xs text-[#5B6B63]">{t('landing.problem_sources')}</p>
            <ul className="space-y-2 pt-2">
              {problemSources.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-xs font-medium text-[#143028]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risks of manual organization */}
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-[#B3261E] text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>{t('landing.problem_risks_title')}</span>
            </div>
            <p className="text-xs text-red-900/80">
              Falhas na conexão entre os elementos enfraquecem o processo administrativo e causam
              retrabalho pericial.
            </p>
            <ul className="space-y-2.5 pt-2">
              {risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-medium text-red-950">
                  <span className="text-[#B3261E] font-bold">✕</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* "Nossa Proposta" Section */}
      <section className="rounded-3xl border border-[#E2E8E4] bg-white p-8 sm:p-12 text-center space-y-6 shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1B5E3A]/20 bg-[#E7F2EC] px-3 py-1 text-xs font-semibold text-[#1B5E3A]">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('landing.proposal_title')}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#143028] max-w-3xl mx-auto">
          "{t('landing.proposal_desc')}"
        </h3>

        {/* Trail Graphic */}
        <div className="max-w-2xl mx-auto py-6">
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-1 border-t-2 border-dashed border-[#1B5E3A]/40" />
            {['Coleta', 'Georreferenciamento', 'Validação', 'Auditoria', 'Emissão'].map(
              (label, idx) => (
                <div key={label} className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1B5E3A] text-white text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-xs">
                    {idx + 1}
                  </div>
                  <span className="text-[11px] font-medium text-[#143028] mt-2 whitespace-nowrap hidden sm:block">
                    {label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Pitch Demo Banner Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1B5E3A] via-[#14502F] to-[#0F766E] p-8 sm:p-12 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-emerald-100">
            <FileSearch className="w-3.5 h-3.5" />
            <span>{t('badge.fictional_demo')}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">
            {t('landing.demo_card_title')}
          </h3>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {t('landing.demo_card_desc')}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link to="/inspections/RV-DEMO-001">
              <Button
                size="lg"
                className="bg-white text-[#1B5E3A] hover:bg-emerald-50 font-semibold shadow-md px-6 h-12 rounded-xl"
              >
                <span>{t('landing.open_demo')}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-semibold h-12 px-6 rounded-xl"
              >
                <span>{t('nav.overview')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Index
