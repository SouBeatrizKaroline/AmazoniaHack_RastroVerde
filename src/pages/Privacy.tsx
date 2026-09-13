import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  ShieldCheck,
  Scale,
  UserCheck,
  FileText,
  Lock,
  Clock,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'

export const Privacy: React.FC = () => {
  const { t } = useI18n()

  const dataTreatedItems = [
    t('privacy.section1_item1'),
    t('privacy.section1_item2'),
    t('privacy.section1_item3'),
    t('privacy.section1_item4'),
  ]

  const legalBases = [
    t('privacy.section2_item1'),
    t('privacy.section2_item2'),
    t('privacy.section2_item3'),
  ]

  const rights = [
    { title: 'Art. 18, I e II', desc: t('privacy.section4_right1') },
    { title: 'Art. 18, III', desc: t('privacy.section4_right2') },
    { title: 'Art. 18, IV', desc: t('privacy.section4_right3') },
    { title: 'Art. 18, V e VII', desc: t('privacy.section4_right4') },
    { title: 'Art. 18, IX', desc: t('privacy.section4_right5') },
  ]

  const securityItems = [
    t('privacy.section6_item1'),
    t('privacy.section6_item2'),
    t('privacy.section6_item3'),
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="min-h-[44px] inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#1B5E3A] hover:bg-[#E7F2EC] hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('auth.back_to_home')}</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F2EC] text-xs font-bold text-[#1B5E3A] border border-[#1B5E3A]/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Lei Federal nº 13.709/2018 (LGPD)</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-white to-[#F7F9F8] p-8 sm:p-12 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143028] tracking-tight">
              {t('privacy.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B63] mt-1">{t('privacy.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Fictional Demo Warning Box */}
      <div className="rounded-3xl border-2 border-[#1B5E3A]/30 bg-[#E7F2EC]/50 p-6 sm:p-7 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-[#1B5E3A]">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{t('privacy.fictional_demo_notice_title')}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#143028] leading-relaxed">
          {t('privacy.fictional_demo_notice_desc')}
        </p>
      </div>

      {/* Section 1: Que dados o sistema trata */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-[#143028]">
          <FileText className="w-5 h-5 text-[#1B5E3A]" />
          <h2>{t('privacy.section1_title')}</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
          {t('privacy.section1_desc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {dataTreatedItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#F7F9F8] border border-[#E2E8E4] text-xs font-medium text-[#143028] flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-[#1B5E3A] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Base Legal */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-[#143028]">
          <Scale className="w-5 h-5 text-[#0F766E]" />
          <h2>{t('privacy.section2_title')}</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
          {t('privacy.section2_desc')}
        </p>
        <div className="space-y-2.5 pt-1">
          {legalBases.map((base, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#E2E8E4] text-xs sm:text-sm text-[#143028] flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <span className="leading-relaxed">{base}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Papel do Sistema - Apoio à Decisão Humana */}
      <div className="rounded-3xl border-2 border-[#1B5E3A] bg-[#F9FCFA] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-[#1B5E3A]">
          <UserCheck className="w-5 h-5" />
          <h2>{t('privacy.section3_title')}</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
          {t('privacy.section3_desc')}
        </p>
        <div className="p-4 rounded-2xl bg-white border border-[#1B5E3A]/30 text-xs sm:text-sm font-bold text-[#1B5E3A] leading-relaxed shadow-2xs">
          {t('privacy.section3_highlight')}
        </div>
        <p className="text-xs text-[#5B6B63] leading-relaxed">{t('privacy.section3_subdesc')}</p>
      </div>

      {/* Section 4: Direitos do Titular (Art. 18) */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-[#143028]">
          <ShieldCheck className="w-5 h-5 text-[#1B5E3A]" />
          <h2>{t('privacy.section4_title')}</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
          {t('privacy.section4_desc')}
        </p>
        <div className="space-y-2.5 pt-1">
          {rights.map((r, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-[#E2E8E4] bg-[#F7F9F8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md text-[11px]">
                  {r.title}
                </span>
                <span className="text-[#143028] font-medium leading-relaxed">{r.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Retenção e Minimização */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-base font-bold text-[#143028]">
          <Clock className="w-5 h-5 text-[#B45309]" />
          <h2>{t('privacy.section5_title')}</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
          {t('privacy.section5_desc')}
        </p>
      </div>

      {/* Section 6: Segurança da Informação e Integridade de Arquivos */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-[#143028]">
          <Lock className="w-5 h-5 text-[#1B5E3A]" />
          <h2>{t('privacy.section6_title')}</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5B6B63] leading-relaxed">
          {t('privacy.section6_desc')}
        </p>
        <div className="space-y-2.5 pt-1">
          {securityItems.map((sec, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#F7F9F8] border border-[#E2E8E4] text-xs text-[#143028] flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{sec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Contact */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-[#143028]">
            {t('privacy.contact_title')}
          </h3>
          <p className="text-xs text-[#5B6B63] leading-relaxed">{t('privacy.contact_desc')}</p>
        </div>

        <Link to="/inspections/RV-DEMO-001">
          <Button className="min-h-[44px] bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold px-5 rounded-xl shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1B5E3A]">
            {t('privacy.contact_btn')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Privacy
