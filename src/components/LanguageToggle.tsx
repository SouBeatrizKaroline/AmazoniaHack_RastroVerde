import React from 'react'
import { useI18n, type Language } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang } = useI18n()

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-[#E2E8E4] bg-white p-0.5 text-xs font-semibold shadow-xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLang('pt')}
        className={`rounded-md px-2.5 py-1 transition-all ${
          lang === 'pt'
            ? 'bg-[#1B5E3A] text-white shadow-xs'
            : 'text-[#5B6B63] hover:text-[#143028]'
        }`}
        aria-pressed={lang === 'pt'}
      >
        PT
      </button>
      <span className="text-[#E2E8E4] px-0.5 select-none">|</span>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`rounded-md px-2.5 py-1 transition-all ${
          lang === 'en'
            ? 'bg-[#1B5E3A] text-white shadow-xs'
            : 'text-[#5B6B63] hover:text-[#143028]'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
