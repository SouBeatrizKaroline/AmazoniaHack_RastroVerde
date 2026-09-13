import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { Shield, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COOKIE_CONSENT_KEY = 'rastroverde_privacy_consent_v1'

export const CookieBanner: React.FC = () => {
  const { t } = useI18n()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (!consent) {
        setIsVisible(true)
      }
    } catch {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    } catch {
      // Ignora erro de localStorage desabilitado
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <aside
      aria-label="Aviso de Privacidade e LGPD"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="rounded-2xl border border-[#1B5E3A]/20 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#E7F2EC] text-[#1B5E3A] shrink-0 mt-0.5">
            <Shield className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="font-bold text-[#143028]">Privacidade & LGPD</div>
            <p className="text-[#5B6B63] leading-relaxed">{t('cookie.banner_text')}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#E2E8E4]">
          <Link
            to="/privacy"
            onClick={() => {
              // Permite ao usuário navegar para ler mais sem fechar permanentemente o aviso
            }}
            className="text-xs font-semibold text-[#1B5E3A] hover:underline px-2.5 py-1.5 flex items-center gap-0.5"
          >
            <span>{t('cookie.learn_more')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-8 px-4 rounded-xl shadow-xs"
          >
            {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default CookieBanner
