import React, { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import {
  Clock,
  ShieldAlert,
  Lightbulb,
  Copy,
  Check,
  Smartphone,
  Layers,
  HelpCircle,
  FileCheck2,
  Sparkles,
  Zap,
  Target,
  ExternalLink,
} from 'lucide-react'

export const PitchCard: React.FC = () => {
  const { t, lang } = useI18n()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<'2min' | '1min' | 'jury' | 'all'>('2min')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [textScale, setTextScale] = useState<'normal' | 'large'>('normal')

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast({
      title: t('pitch.copied'),
      duration: 2000,
    })
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev))
    }, 2000)
  }

  // Roteiro 2 minutos estruturado
  const script2min = [
    {
      id: '2min_1',
      time: t('pitch.2min_step1_time'),
      label: t('pitch.2min_step1_label'),
      text: t('pitch.2min_step1_text'),
      accent: 'border-l-amber-500 bg-amber-50/40 text-amber-950',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: '2min_2',
      time: t('pitch.2min_step2_time'),
      label: t('pitch.2min_step2_label'),
      text: t('pitch.2min_step2_text'),
      accent: 'border-l-emerald-600 bg-emerald-50/40 text-emerald-950',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      id: '2min_3',
      time: t('pitch.2min_step3_time'),
      label: t('pitch.2min_step3_label'),
      text: t('pitch.2min_step3_text'),
      accent: 'border-l-teal-600 bg-teal-50/40 text-teal-950',
      badgeClass: 'bg-teal-100 text-teal-900 border-teal-300',
    },
    {
      id: '2min_4',
      time: t('pitch.2min_step4_time'),
      label: t('pitch.2min_step4_label'),
      text: t('pitch.2min_step4_text'),
      accent: 'border-l-red-600 bg-red-50/40 text-red-950 ring-1 ring-red-200/60',
      badgeClass: 'bg-red-100 text-red-900 border-red-300 font-bold',
      highlight: true,
    },
    {
      id: '2min_5',
      time: t('pitch.2min_step5_time'),
      label: t('pitch.2min_step5_label'),
      text: t('pitch.2min_step5_text'),
      accent: 'border-l-blue-600 bg-blue-50/40 text-blue-950',
      badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      id: '2min_6',
      time: t('pitch.2min_step6_time'),
      label: t('pitch.2min_step6_label'),
      text: t('pitch.2min_step6_text'),
      accent: 'border-l-[#1B5E3A] bg-[#E7F2EC]/50 text-[#143028]',
      badgeClass: 'bg-[#1B5E3A] text-white border-transparent',
    },
  ]

  // Pitch 1 minuto estruturado
  const script1min = [
    {
      id: '1min_1',
      time: t('pitch.1min_step1_time'),
      label: t('pitch.1min_step1_label'),
      text: t('pitch.1min_step1_text'),
      accent: 'border-l-amber-500 bg-amber-50/40 text-amber-950',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: '1min_2',
      time: t('pitch.1min_step2_time'),
      label: t('pitch.1min_step2_label'),
      text: t('pitch.1min_step2_text'),
      accent: 'border-l-emerald-600 bg-emerald-50/40 text-emerald-950',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      id: '1min_3',
      time: t('pitch.1min_step3_time'),
      label: t('pitch.1min_step3_label'),
      text: t('pitch.1min_step3_text'),
      accent: 'border-l-red-600 bg-red-50/40 text-red-950 ring-1 ring-red-200/60',
      badgeClass: 'bg-red-100 text-red-900 border-red-300 font-bold',
      highlight: true,
    },
    {
      id: '1min_4',
      time: t('pitch.1min_step4_time'),
      label: t('pitch.1min_step4_label'),
      text: t('pitch.1min_step4_text'),
      accent: 'border-l-[#1B5E3A] bg-[#E7F2EC]/50 text-[#143028]',
      badgeClass: 'bg-[#1B5E3A] text-white border-transparent',
    },
  ]

  // Respostas para o júri estruturadas
  const juryAnswers = [
    {
      id: 'jury_1',
      number: '1',
      question: t('pitch.jury_q1'),
      answer: t('pitch.jury_a1'),
      theme: 'Segurança & Integridade (SHA-256)',
      keywords: ['SHA-256', 'Trilha de auditoria', 'Sem blockchain', 'Agente decide'],
    },
    {
      id: 'jury_2',
      number: '2',
      question: t('pitch.jury_q2'),
      answer: t('pitch.jury_a2'),
      theme: 'Custos & Escalar em Município Pequeno',
      keywords: ['Sob demanda', 'Sem infra pesada contínua', 'Medição preparada', 'Honestidade'],
    },
    {
      id: 'jury_3',
      number: '3',
      question: t('pitch.jury_q3'),
      answer: t('pitch.jury_a3'),
      theme: 'Flexibilidade por Município (Modelos Normativos)',
      keywords: ['Altamira', 'Paragominas', 'Tailândia', 'Ulianópolis', 'Rastreabilidade mantida'],
    },
  ]

  const fullText2min = script2min.map((s) => `[${s.time}] ${s.label}\n"${s.text}"`).join('\n\n')
  const fullText1min = script1min.map((s) => `[${s.time}] ${s.label}\n"${s.text}"`).join('\n\n')
  const fullTextJury = juryAnswers
    .map((j) => `PERGUNTA ${j.number}: "${j.question}"\nRESPOSTA:\n"${j.answer}"`)
    .join('\n\n')

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-12">
      {/* 1. Aviso de Material Interno Discreto */}
      <div className="rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-900 shadow-xs flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed">
          <span className="font-bold uppercase tracking-wider text-[10px] mr-1.5 px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-950">
            {t('pitch.internal_banner_badge')}
          </span>
          <span className="font-medium">{t('pitch.internal_banner_text')}</span>
        </div>
      </div>

      {/* 2. Top Header do Cartão de Bolso */}
      <div className="bg-white rounded-xl border border-[#E2E8E4] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E7F2EC] text-[#1B5E3A] border border-[#1B5E3A]/20">
                <Sparkles className="w-3 h-3" />
                AmazoniaHack
              </span>
              <span className="text-xs text-[#5B6B63] font-mono">
                {lang === 'pt' ? 'Português (Brasil)' : 'English (US)'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#143028] mt-1.5 tracking-tight flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#1B5E3A] hidden xs:inline" />
              <span>{t('pitch.title')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B63] mt-1 leading-snug">
              {t('pitch.subtitle')}
            </p>
          </div>

          {/* Quick controls: Text Size & Direct Demo Tab Opener */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <div className="flex items-center rounded-lg border border-[#E2E8E4] bg-[#F7F9F8] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setTextScale('normal')}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  textScale === 'normal'
                    ? 'bg-white text-[#1B5E3A] shadow-xs'
                    : 'text-[#5B6B63] hover:text-[#143028]'
                }`}
                title="Tamanho padrão de leitura"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextScale('large')}
                className={`px-2.5 py-1 rounded font-bold transition-all text-sm ${
                  textScale === 'large'
                    ? 'bg-white text-[#1B5E3A] shadow-xs'
                    : 'text-[#5B6B63] hover:text-[#143028]'
                }`}
                title="Texto ampliado para consultar no palco / celular"
              >
                A+
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/inspections/RV-DEMO-001', '_blank')}
              className="h-8 text-xs font-semibold border-[#1B5E3A]/30 text-[#1B5E3A] hover:bg-[#E7F2EC] flex items-center gap-1.5"
              title="Abre a tela de demonstração em uma nova aba"
            >
              <span>Abrir Demo</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Tabs de navegação compactas */}
        <div className="mt-4 pt-3 border-t border-[#E2E8E4]">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as '2min' | '1min' | 'jury' | 'all')}
          >
            <TabsList className="grid grid-cols-4 w-full bg-[#F7F9F8] p-1 border border-[#E2E8E4] rounded-lg h-auto">
              <TabsTrigger
                value="2min"
                className="text-xs font-semibold py-2 data-[state=active]:bg-[#1B5E3A] data-[state=active]:text-white data-[state=active]:shadow-xs transition-all flex items-center justify-center gap-1"
              >
                <Clock className="w-3.5 h-3.5 hidden sm:inline" />
                <span>{t('pitch.tab_script_2min')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="1min"
                className="text-xs font-semibold py-2 data-[state=active]:bg-[#1B5E3A] data-[state=active]:text-white data-[state=active]:shadow-xs transition-all flex items-center justify-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 hidden sm:inline" />
                <span>{t('pitch.tab_script_1min')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="jury"
                className="text-xs font-semibold py-2 data-[state=active]:bg-[#1B5E3A] data-[state=active]:text-white data-[state=active]:shadow-xs transition-all flex items-center justify-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5 hidden sm:inline" />
                <span>{t('pitch.tab_jury')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="text-xs font-semibold py-2 data-[state=active]:bg-[#1B5E3A] data-[state=active]:text-white data-[state=active]:shadow-xs transition-all flex items-center justify-center gap-1"
              >
                <Layers className="w-3.5 h-3.5 hidden sm:inline" />
                <span>{t('pitch.tab_all')}</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Conteúdo: 2 Minutos */}
      {(activeTab === '2min' || activeTab === 'all') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#1B5E3A] text-white hover:bg-[#1B5E3A] font-bold text-[11px] px-2.5 py-0.5">
                {t('pitch.2min_badge')}
              </Badge>
              <h2 className="text-base sm:text-lg font-bold text-[#143028]">
                {t('pitch.2min_title')}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(fullText2min, '2min_full')}
              className="text-xs h-7 text-[#5B6B63] hover:text-[#1B5E3A] flex items-center gap-1"
            >
              {copiedKey === '2min_full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{t('pitch.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('pitch.copy_all')}</span>
                </>
              )}
            </Button>
          </div>

          {/* Dica de apresentação em destaque */}
          <div className="rounded-lg border border-amber-300 bg-amber-50/90 p-3 text-xs text-amber-950 flex items-start gap-2.5 shadow-xs">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 block mb-0.5">
                ★ {t('pitch.2min_tip_label')}
              </span>
              <p className="font-medium">{t('pitch.2min_tip_text')}</p>
            </div>
          </div>

          {/* Blocos cronometrados */}
          <div className="grid gap-2.5">
            {script2min.map((step) => (
              <Card
                key={step.id}
                className={`border-l-4 transition-all shadow-xs ${step.accent} bg-white hover:shadow-sm`}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${step.badgeClass}`}
                      >
                        <Clock className="w-3 h-3" />
                        {step.time}
                      </span>
                      <span className="text-xs font-bold text-[#143028] uppercase tracking-wide">
                        {step.label}
                      </span>
                      {step.highlight && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full uppercase tracking-wider animate-pulse shadow-xs ring-2 ring-red-400/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          Momento mais forte (Divergência 12,3 vs 11,8 ha)
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(`[${step.time}] "${step.text}"`, step.id)}
                      className="min-h-[36px] px-2.5 text-xs text-[#5B6B63] hover:text-[#1B5E3A] border-[#E2E8E4] bg-white rounded-lg shadow-2xs hover:shadow-xs flex items-center gap-1"
                      title="Copiar este trecho"
                    >
                      {copiedKey === step.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold text-[11px]">
                            {t('pitch.copied')}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <blockquote
                    className={`italic text-[#143028] leading-relaxed border-l-2 border-black/10 pl-3 my-1 font-serif ${
                      textScale === 'large' ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                    }`}
                  >
                    "{step.text}"
                  </blockquote>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Conteúdo: 1 Minuto */}
      {(activeTab === '1min' || activeTab === 'all') && (
        <section
          className={`space-y-3 ${activeTab === 'all' ? 'pt-6 border-t border-[#E2E8E4]' : ''}`}
        >
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#0F766E] text-white hover:bg-[#0F766E] font-bold text-[11px] px-2.5 py-0.5">
                {t('pitch.1min_badge')}
              </Badge>
              <h2 className="text-base sm:text-lg font-bold text-[#143028]">
                {t('pitch.1min_title')}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(fullText1min, '1min_full')}
              className="text-xs h-7 text-[#5B6B63] hover:text-[#1B5E3A] flex items-center gap-1"
            >
              {copiedKey === '1min_full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{t('pitch.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('pitch.copy_all')}</span>
                </>
              )}
            </Button>
          </div>

          {/* Dica de preparação do pitch de 1 min */}
          <div className="rounded-lg border border-teal-300 bg-teal-50/90 p-3 text-xs text-teal-950 flex items-start gap-2.5 shadow-xs">
            <Zap className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold uppercase tracking-wider text-[10px] text-teal-800 block mb-0.5">
                ⚡ {t('pitch.1min_tip_label')}
              </span>
              <p className="font-medium">{t('pitch.1min_tip_text')}</p>
            </div>
          </div>

          {/* Blocos cronometrados do 1 min */}
          <div className="grid gap-2.5">
            {script1min.map((step) => (
              <Card
                key={step.id}
                className={`border-l-4 transition-all shadow-xs ${step.accent} bg-white hover:shadow-sm`}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${step.badgeClass}`}
                      >
                        <Clock className="w-3 h-3" />
                        {step.time}
                      </span>
                      <span className="text-xs font-bold text-[#143028] uppercase tracking-wide">
                        {step.label}
                      </span>
                      {step.highlight && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full uppercase tracking-wider animate-pulse shadow-xs ring-2 ring-red-400/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          Momento crítico (12,3 vs 11,8 ha)
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(`[${step.time}] "${step.text}"`, step.id)}
                      className="h-6 w-6 p-0 text-[#5B6B63] hover:text-[#1B5E3A]"
                      title="Copiar este bloco"
                    >
                      {copiedKey === step.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <blockquote
                    className={`italic text-[#143028] leading-relaxed border-l-2 border-black/10 pl-3 my-1 font-serif ${
                      textScale === 'large' ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                    }`}
                  >
                    "{step.text}"
                  </blockquote>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Conteúdo: Respostas do Júri */}
      {(activeTab === 'jury' || activeTab === 'all') && (
        <section
          className={`space-y-3 ${activeTab === 'all' ? 'pt-6 border-t border-[#E2E8E4]' : ''}`}
        >
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-700 text-white hover:bg-purple-700 font-bold text-[11px] px-2.5 py-0.5">
                {t('pitch.jury_badge')}
              </Badge>
              <h2 className="text-base sm:text-lg font-bold text-[#143028]">
                {t('pitch.jury_title')}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(fullTextJury, 'jury_full')}
              className="text-xs h-7 text-[#5B6B63] hover:text-[#1B5E3A] flex items-center gap-1"
            >
              {copiedKey === 'jury_full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{t('pitch.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('pitch.copy_all')}</span>
                </>
              )}
            </Button>
          </div>

          {/* Nota de estratégia para a banca */}
          <div className="rounded-lg border border-purple-300 bg-purple-50/90 p-3 text-xs text-purple-950 flex items-start gap-2.5 shadow-xs">
            <Target className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold uppercase tracking-wider text-[10px] text-purple-900 block mb-0.5">
                🎯 {t('pitch.jury_strategy_label')}
              </span>
              <p className="font-medium">{t('pitch.jury_strategy_text')}</p>
            </div>
          </div>

          {/* Cards de perguntas e respostas */}
          <div className="grid gap-3">
            {juryAnswers.map((j) => (
              <Card
                key={j.id}
                className="bg-white border border-[#E2E8E4] shadow-xs hover:shadow-sm transition-all overflow-hidden"
              >
                <CardHeader className="bg-[#F7F9F8] border-b border-[#E2E8E4] p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1B5E3A] text-white text-xs font-bold shrink-0 mt-0.5">
                        {j.number}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B63] block">
                          {j.theme}
                        </span>
                        <CardTitle className="text-xs sm:text-sm font-bold text-[#143028] mt-0.5 leading-snug">
                          "{j.question}"
                        </CardTitle>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(`P: "${j.question}"\nR: "${j.answer}"`, j.id)}
                      className="h-6 w-6 p-0 text-[#5B6B63] hover:text-[#1B5E3A] shrink-0"
                      title="Copiar pergunta e resposta"
                    >
                      {copiedKey === j.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 space-y-2.5">
                  <blockquote
                    className={`italic text-[#143028] leading-relaxed border-l-2 border-[#1B5E3A] pl-3 font-serif ${
                      textScale === 'large' ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                    }`}
                  >
                    "{j.answer}"
                  </blockquote>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#E2E8E4]/60">
                    <span className="text-[10px] font-semibold text-[#5B6B63] uppercase">
                      Pontos de ancoragem:
                    </span>
                    {j.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E7F2EC] text-[#1B5E3A]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Cartão de bolso fixo/rodapé de consulta rápida */}
      <div className="rounded-xl border border-[#1B5E3A]/20 bg-gradient-to-r from-[#E7F2EC] via-white to-[#E7F2EC] p-3 sm:p-4 text-xs text-[#143028] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#1B5E3A] shrink-0" />
          <span className="font-semibold">
            RastroVerde — Da evidência de campo à minuta de fiscalização rastreável.
          </span>
        </div>
        <span className="text-[11px] text-[#5B6B63] font-mono shrink-0">
          Humano revisa, sistema rastreia.
        </span>
      </div>
    </div>
  )
}

export default PitchCard
