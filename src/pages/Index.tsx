import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { useTour } from '@/components/TourProvider'
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
  Sparkles,
  Lock,
  UserCheck,
  CheckSquare,
  FileCheck2,
  ExternalLink,
  Shield,
  ArrowUpRight,
  Eye,
  Activity,
  GitBranch,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Index: React.FC = () => {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  const { startTour } = useTour()
  const navigate = useNavigate()
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const flowSteps = [
    {
      step: '01',
      icon: MapPin,
      label: t('landing.flow_field'),
      desc: 'Fixação de ponto georreferenciado, polígono da área e abertura do auto.',
      highlight: 'Datum SIRGAS 2000',
    },
    {
      step: '02',
      icon: Camera,
      label: t('landing.flow_evidence'),
      desc: 'Fotos com metadados, gravações, notas técnicas e arquivos comprobatórios.',
      highlight: 'Cadeia de Custódia',
    },
    {
      step: '03',
      icon: Search,
      label: t('landing.flow_verification'),
      desc: 'Varredura automática e cruzamento prudente de horários e coordenadas GPS.',
      highlight: 'Linguagem Cautelosa',
    },
    {
      step: '04',
      icon: Puzzle,
      label: t('landing.flow_gaps'),
      desc: 'Auditoria prévia de requisitos: identificação de agentes e títulos pendentes.',
      highlight: 'Checklist de Validade',
    },
    {
      step: '05',
      icon: FileText,
      label: t('landing.flow_report'),
      desc: 'Laudo pericial estruturado com âncoras diretas para a evidência de campo.',
      highlight: 'Rastreabilidade Total',
    },
  ]

  const problemSources = [
    { name: 'Fotografias em celulares e câmeras avulsas', type: 'Sem metadado amarrado' },
    { name: 'Anotações manuais em prancheta de campo', type: 'Vulnerável a perda' },
    { name: 'Waypoints dispersos em receptores GPS', type: 'Sem vínculo ao auto' },
    { name: 'Certidões dominiais e recibos de CAR', type: 'Desconectados do laudo' },
    { name: 'Relatos e depoimentos verbais de terceiros', type: 'Sem custódia formal' },
    { name: 'Autos de embargo e notificações preliminares', type: 'Dispersão de autos' },
    { name: 'Alertas DETER e imagens de satélite', type: 'Formatos não integrados' },
  ]

  const risks = [
    t('landing.risk_forgotten'),
    t('landing.risk_context'),
    t('landing.risk_inconsistencies'),
    t('landing.risk_duplications'),
    t('landing.risk_gaps'),
  ]

  const demoFeatures = [
    {
      title: t('landing.demo_step1'),
      badge: 'RV-DEMO-001',
      icon: MapPin,
    },
    {
      title: t('landing.demo_step2'),
      badge: 'EVD-008 a EVD-026',
      icon: Camera,
    },
    {
      title: t('landing.demo_step3'),
      badge: 'Detecção IA + Geo',
      icon: Search,
    },
    {
      title: t('landing.demo_step4'),
      badge: 'Rastreável 100%',
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-14 sm:space-y-18 lg:space-y-24 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-[#F9FCFA] to-[#EFF5F1] p-6 sm:p-10 lg:p-16 shadow-xs">
        {/* Subtle topographical SVG background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topo" width="120" height="120" patternUnits="userSpaceOnUse">
                <path
                  d="M0 60 Q 30 25, 60 60 T 120 60"
                  fill="none"
                  stroke="#1B5E3A"
                  strokeWidth="2"
                />
                <path
                  d="M0 30 Q 30 -5, 60 30 T 120 30"
                  fill="none"
                  stroke="#1B5E3A"
                  strokeWidth="1.5"
                />
                <path
                  d="M0 90 Q 30 55, 60 90 T 120 90"
                  fill="none"
                  stroke="#1B5E3A"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo)" />
          </svg>
        </div>

        {/* Ambient forest green aura */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-[#1B5E3A]/6 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-7">
          {/* Eyebrows */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1B5E3A]/25 bg-[#E7F2EC] px-3.5 py-1 text-xs font-semibold text-[#1B5E3A] shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#1B5E3A]" />
              <span>RastroVerde • GovTech Socioambiental</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8E4] bg-white/95 backdrop-blur-xs px-3.5 py-1 text-xs font-medium text-[#5B6B63] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
              <span>{t('landing.amazoniahack_badge')}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#143028] leading-[1.12]">
            {t('landing.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base lg:text-lg text-[#5B6B63] max-w-2xl mx-auto leading-relaxed">
            {t('landing.subheadline')}
          </p>

          {/* Action CTAs: Hierarquia refinada com hover states modernos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-xl mx-auto">
            {/* CTA 1: Demonstração Interativa (Foco principal imediato para avaliação) */}
            <Link to="/inspections/RV-DEMO-001" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#1B5E3A] hover:bg-[#14502F] text-white font-bold shadow-md shadow-[#1B5E3A]/20 hover:shadow-lg hover:shadow-[#1B5E3A]/30 h-12 px-7 rounded-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Compass className="w-4 h-4 text-emerald-200" />
                <span className="text-sm sm:text-base">{t('landing.enter_demo')}</span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/20 text-white">
                  RV-DEMO-001
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </Button>
            </Link>

            {/* CTA 2: Iniciar fiscalização (leva para new inspection se logado, ou login se visitante) */}
            <Link to={isAuthenticated ? '/inspections/new' : '/login'} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-[#1B5E3A]/30 bg-white hover:bg-[#F7F9F8] text-[#143028] font-bold h-12 px-6 rounded-xl shadow-xs transition-all hover:border-[#1B5E3A] flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-[#1B5E3A]" />
                <span>{t('landing.start_inspection')}</span>
              </Button>
            </Link>
          </div>

          {/* Microcopy persuasivo e técnico */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 text-xs text-[#5B6B63]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E3A]" />
              <span>Acesso imediato sem necessidade de cadastro</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E3A]" />
              <span>Dossiê georreferenciado com 3 falhas de teste</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E3A]" />
              <span>Cadeia de custódia auditável ponta a ponta</span>
            </span>
          </div>
        </div>

        {/* Seção Como o RastroVerde Funciona: 6 Passos Oficiais do Desafio 1 */}
        <div className="relative z-10 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#E2E8E4]">
          <div className="text-center max-w-2xl mx-auto mb-7 space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B5E3A]">
              <GitBranch className="w-3.5 h-3.5" />
              <span>{t('landing.flow_title')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#143028]">
              {t('landing.how_it_works_title')}
            </h2>
            <p className="text-xs text-[#5B6B63]">{t('landing.flow_subtitle')}</p>
          </div>

          {/* 6 Passos: 1. Recebe -> 2. Organiza -> 3. Extrai -> 4. Verifica -> 5. Gera Minuta -> 6. Humano Revisa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 relative z-10">
            {[
              {
                step: '1',
                title: t('landing.step1_title'),
                desc: t('landing.step1_desc'),
                highlight: t('landing.step1_highlight'),
                icon: Camera,
              },
              {
                step: '2',
                title: t('landing.step2_title'),
                desc: t('landing.step2_desc'),
                highlight: t('landing.step2_highlight'),
                icon: Layers,
              },
              {
                step: '3',
                title: t('landing.step3_title'),
                desc: t('landing.step3_desc'),
                highlight: t('landing.step3_highlight'),
                icon: Search,
              },
              {
                step: '4',
                title: t('landing.step4_title'),
                desc: t('landing.step4_desc'),
                highlight: t('landing.step4_highlight'),
                icon: ShieldCheck,
              },
              {
                step: '5',
                title: t('landing.step5_title'),
                desc: t('landing.step5_desc'),
                highlight: t('landing.step5_highlight'),
                icon: FileText,
              },
              {
                step: '6',
                title: t('landing.step6_title'),
                desc: t('landing.step6_desc'),
                highlight: t('landing.step6_highlight'),
                icon: CheckCircle2,
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#E2E8E4] shadow-2xs hover:border-[#1B5E3A] hover:shadow-md transition-all"
                >
                  <div className="relative mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-[#143028] text-white font-mono text-[9px] font-bold">
                      {item.step}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#143028] mb-1">
                    {item.title}
                  </div>
                  <span className="text-[10px] font-semibold text-[#0F766E] uppercase tracking-wider mb-1.5">
                    {item.highlight}
                  </span>
                  <p className="text-[11px] text-[#5B6B63] leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
        {/* Scroll cue */}
        <div className="flex justify-center pt-6">
          <a
            href="#demo-section"
            className="text-[#5B6B63] hover:text-[#1B5E3A] transition-colors p-2"
            title="Avançar para a demonstração"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* Interactive Demonstration Showcase Card (RV-DEMO-001) */}
      <section
        id="demo-section"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#122820] via-[#1B5E3A] to-[#0F766E] text-white p-6 sm:p-10 lg:p-14 shadow-xl border border-emerald-900/40"
      >
        {/* Subtle topographical background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="url(#topo)" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Context, Value Proposition & CTA */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-0.5 text-xs font-bold text-emerald-100 border border-white/25">
                <FileSearch className="w-3.5 h-3.5" />
                <span>{t('badge.fictional_demo')}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 backdrop-blur-md px-3 py-0.5 text-xs font-mono font-medium text-emerald-200 border border-emerald-700/50">
                APA Setor Norte • 1.450 ha
              </span>
            </div>

            <div className="space-y-2.5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {t('landing.demo_card_title')}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-emerald-100/95 leading-relaxed">
                {t('landing.demo_card_desc')}
              </p>
            </div>

            {/* 4 Mini Steps of what visitor sees in demo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {demoFeatures.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-200">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-emerald-300 block uppercase">
                        {item.badge}
                      </span>
                      <span className="text-xs font-medium text-white/95 leading-snug block">
                        {item.title}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Demo CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <Link to="/inspections/RV-DEMO-001">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white hover:bg-emerald-50 text-[#1B5E3A] font-extrabold shadow-md px-6 h-11 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t('landing.open_demo')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={startTour}
                className="w-full sm:w-auto border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold h-11 px-5 rounded-xl flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-200" />
                <span>{t('tour.button')} (Pitch)</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Dossier Card Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white text-[#143028] p-5 sm:p-6 shadow-2xl border border-emerald-100/30 space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8E4]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-[#1B5E3A]">RV-DEMO-001</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E7F2EC] text-[#1B5E3A]">
                  Pronta para relatório
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="font-bold text-base text-[#143028]">
                  APA Setor Norte — Gleba Castanhal
                </h3>
                <p className="text-xs text-[#5B6B63]">
                  Novo Progresso • PA • Vistoria Integrada de Alerta DETER
                </p>
              </div>

              {/* Dossier quick metrics */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="p-2.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-center">
                  <span className="text-[10px] text-[#5B6B63] block font-medium">Evidências</span>
                  <span className="text-base font-extrabold text-[#1B5E3A]">14</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-center">
                  <span className="text-[10px] text-[#5B6B63] block font-medium">Completude</span>
                  <span className="text-base font-extrabold text-[#0F766E]">78%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-center">
                  <span className="text-[10px] text-[#5B6B63] block font-medium">
                    Falhas Propositais
                  </span>
                  <span className="text-base font-extrabold text-[#B45309]">3</span>
                </div>
              </div>

              {/* Simulated trace link */}
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-[#143028] space-y-1">
                <div className="flex items-center justify-between font-bold text-[#1B5E3A]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Rastreabilidade Validada</span>
                  </span>
                  <span className="text-[10px] font-mono">EVD-014 ↔ Relatório</span>
                </div>
                <p className="text-[11px] text-[#5B6B63] leading-relaxed">
                  Cada achado técnico possui âncora direta para a coordenada e fotografia de campo
                  correspondente.
                </p>
              </div>

              <Link to="/inspections/RV-DEMO-001" className="block pt-1">
                <Button className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white font-bold text-xs h-10 rounded-xl shadow-xs">
                  Abrir Dossiê Demonstrativo Completo →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* "O Problema" Section: Cenário real em campo e riscos da fragmentação */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B45309]">
            <AlertTriangle className="w-4 h-4" />
            <span>O Cenário Real em Campo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#143028] mt-1 tracking-tight">
            {t('landing.problem_title')}
          </h2>
          <p className="text-[#5B6B63] text-sm sm:text-base mt-2 leading-relaxed">
            {t('landing.problem_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scattered Sources Card */}
          <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-bold text-[#143028] text-base">
              <div className="w-8 h-8 rounded-xl bg-[#E7F2EC] text-[#0F766E] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="block leading-tight">{t('landing.problem_sources_subtitle')}</span>
                <span className="text-xs font-normal text-[#5B6B63]">
                  Fontes dispersas sem padrão de custódia
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5B6B63] leading-relaxed">{t('landing.problem_sources')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {problemSources.map((item, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] flex items-center justify-between gap-2"
                >
                  <span className="text-xs font-medium text-[#143028] truncate">{item.name}</span>
                  <span className="text-[10px] font-semibold text-[#5B6B63] bg-white px-2 py-0.5 rounded border border-[#E2E8E4] shrink-0">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Risks of manual organization */}
          <div className="rounded-3xl border border-red-200 bg-red-50/40 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-bold text-[#B3261E] text-base">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-[#B3261E] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="block leading-tight">{t('landing.problem_risks_title')}</span>
                <span className="text-xs font-normal text-red-800/80">
                  Vulnerabilidades processuais
                </span>
              </div>
            </div>

            <p className="text-xs text-red-950/80 leading-relaxed">
              {t('landing.problem_risks_subtitle')}
            </p>

            <ul className="space-y-2.5 pt-2">
              {risks.map((risk, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/80 border border-red-200/80 text-xs font-medium text-red-950"
                >
                  <span className="w-5 h-5 rounded-full bg-red-100 text-[#B3261E] font-bold text-xs flex items-center justify-center shrink-0">
                    ✕
                  </span>
                  <span className="leading-snug">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* "Nossa Proposta" Section: Rastreabilidade bidirecional */}
      <section className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-10 lg:p-12 shadow-xs space-y-6 sm:space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1B5E3A]/20 bg-[#E7F2EC] px-3.5 py-1 text-xs font-semibold text-[#1B5E3A]">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('landing.proposal_title')}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#143028] tracking-tight">
            "{t('landing.proposal_highlight')}"
          </h3>

          <p className="text-xs sm:text-sm lg:text-base text-[#5B6B63] leading-relaxed">
            {t('landing.proposal_explanation')}
          </p>
        </div>

        {/* Trail Graphic */}
        <div className="max-w-3xl mx-auto py-2">
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-[#1B5E3A]/30" />
            {[
              { label: 'Coleta em Campo', sub: 'Fotos & Lat/Long' },
              { label: 'Georreferenciamento', sub: 'Polígono SIRGAS' },
              { label: 'Consistência', sub: 'Cruzamento GNSS' },
              { label: 'Auditoria de Lacunas', sub: 'Checklist Prévio' },
              { label: 'Laudo Rastreável', sub: 'Vínculo Bidirecional' },
            ].map((step, idx) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1B5E3A] text-white text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-sm">
                  {idx + 1}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#143028] mt-2 whitespace-nowrap hidden sm:block">
                  {step.label}
                </span>
                <span className="text-[10px] text-[#5B6B63] hidden md:block">{step.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destaque: A evidência não deve terminar numa pasta */}
      <section className="rounded-3xl border-2 border-[#1B5E3A] bg-gradient-to-r from-[#E7F2EC]/90 via-white to-[#E7F2EC]/60 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="font-bold text-xs uppercase tracking-wider text-[#1B5E3A] bg-white px-3 py-1 rounded-full border border-[#1B5E3A]/30 inline-block shadow-2xs">
            {t('landing.folder_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#143028]">
            {t('landing.folder_headline')}
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed max-w-2xl mx-auto">
            {t('landing.folder_desc')}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/inspections/RV-DEMO-001">
              <Button className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-10 px-6 rounded-xl shadow-xs">
                {t('landing.btn_demo')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Acesso Institucional / Agentes */}
      <section className="rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-[#F7F9F8] to-white p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3.5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#143028]/20 bg-white px-3 py-1 text-xs font-semibold text-[#143028]">
              <Lock className="w-3.5 h-3.5 text-[#1B5E3A]" />
              <span>Ambiente Institucional Restrito</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#143028] tracking-tight">
              {t('landing.access_block_title')}
            </h3>

            <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
              {t('landing.access_block_desc')}
            </p>

            <div className="space-y-2 pt-1">
              {[
                t('landing.access_benefit_1'),
                t('landing.access_benefit_2'),
                t('landing.access_benefit_3'),
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs font-semibold text-[#143028]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E3A] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <Link to="/login" className="w-full">
              <Button
                size="lg"
                className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white font-bold h-11 rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t('landing.btn_access_agent')}</span>
              </Button>
            </Link>

            <Link to="/signup" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-[#E2E8E4] bg-white hover:bg-[#F7F9F8] text-[#143028] font-semibold h-11 rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <span>{t('landing.btn_create_account')}</span>
                <ArrowRight className="w-4 h-4 text-[#5B6B63]" />
              </Button>
            </Link>

            <p className="text-[11px] text-center text-[#5B6B63] pt-0.5">
              {t('auth.security_notice')}
            </p>
          </div>
        </div>
      </section>

      {/* Open Source / AmazoniaHack Institutional Seal Card */}
      <div className="rounded-2xl border border-[#1B5E3A]/20 bg-[#E7F2EC]/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white text-[#1B5E3A] border border-[#1B5E3A]/20 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#143028] block">
              {t('landing.amazoniahack_badge')}
            </span>
            <span className="text-[#5B6B63]">
              Tecnologia de apoio técnico à fiscalização socioambiental da Amazônia.
            </span>
          </div>
        </div>

        <Link
          to="/about"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1B5E3A] hover:underline shrink-0"
        >
          <span>Conhecer o projeto</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
export default Index
