import React from 'react'
import { useI18n } from '@/lib/i18n'
import { ShieldCheck, Users, Compass, CheckCircle2, FileCheck2, Cpu, Layers } from 'lucide-react'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'

export const About: React.FC = () => {
  const { t } = useI18n()

  const team = ['Beatriz Karoline Cordeiro da Silva', 'Léo Matias Araújo', 'Sonia Janara S. Barros']

  const differentials = [t('about.diff_1'), t('about.diff_2'), t('about.diff_3')]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Brand Hero Card */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-gradient-to-b from-white via-white to-[#F7F9F8] p-8 sm:p-12 shadow-xs space-y-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RastroVerdeLogo size="lg" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">{t('about.title')}</h1>
          <p className="text-sm sm:text-base text-[#5B6B63] leading-relaxed">{t('about.text')}</p>
        </div>

        <div className="pt-2 text-xs font-semibold text-[#1B5E3A] italic">
          "{t('brand.tagline')}"
        </div>
      </div>

      {/* AmazoniaHack & Open Source Badge Section */}
      <div className="rounded-3xl border border-[#1B5E3A]/20 bg-[#E7F2EC]/40 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-base text-[#1B5E3A]">
          <Compass className="w-5 h-5" />
          <span>{t('about.amazoniahack_title')}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#143028] leading-relaxed">
          {t('about.amazoniahack_desc')}
        </p>
        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#1B5E3A]/20 text-xs text-[#143028] leading-relaxed space-y-1">
          <strong className="text-[#1B5E3A] block">
            Princípio de Defensabilidade Técnica & Regras de Integridade:
          </strong>
          <span>
            O RastroVerde não substitui o fiscal ambiental nem garante vereditos jurídicos
            automáticos. Nossa missão é estruturar as evidências coletadas em campo, identificar
            lacunas probatórias e gerar minutas de relatórios onde cada afirmação aponte diretamente
            para o arquivo e trecho probatório original.
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1B5E3A]/30 bg-white px-3 py-1 text-xs font-semibold text-[#1B5E3A]">
          <span className="w-2 h-2 rounded-full bg-[#1B5E3A]" />
          <span>{t('landing.amazoniahack_badge')}</span>
        </div>
      </div>

      {/* Differentials */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-bold text-base text-[#143028]">
          <ShieldCheck className="w-5 h-5 text-[#1B5E3A]" />
          <span>{t('about.differentials_title')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {differentials.map((diff, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#E2E8E4] space-y-2 hover:border-[#1B5E3A] transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center font-bold text-xs">
                0{idx + 1}
              </div>
              <p className="text-xs font-medium text-[#143028] leading-snug">{diff}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section (Only Names, As Strictly Requested) */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-bold text-base text-[#143028]">
          <Users className="w-5 h-5 text-[#0F766E]" />
          <span>{t('about.team_title')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {team.map((member) => (
            <div
              key={member}
              className="p-4 rounded-2xl border border-[#E2E8E4] bg-white shadow-2xs flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-[#1B5E3A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {member.charAt(0)}
              </div>
              <span className="text-xs font-bold text-[#143028]">{member}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Architecture Note */}
      <div className="p-4 rounded-2xl bg-[#E7F2EC]/50 border border-[#1B5E3A]/20 text-xs text-[#143028] space-y-1">
        <span className="font-bold text-[#1B5E3A]">Arquitetura de Interoperabilidade:</span>
        <p className="text-[#5B6B63]">
          O RastroVerde foi projetado com esquemas de dados prontos para futuras integrações com
          sistemas governamentais e plataformas geoespaciais oficiais. O sistema não substitui o
          juízo fiscal do agente, atuando estritamente como suporte técnico à integridade dos
          registros.
        </p>
      </div>
    </div>
  )
}
export default About
