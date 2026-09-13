import React from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useTour } from '@/components/TourProvider'
import { CookieBanner } from '@/components/CookieBanner'
import {
  LayoutDashboard,
  FileCheck2,
  Image as ImageIcon,
  Map as MapIcon,
  SearchCheck,
  CheckSquare,
  FileText,
  History as HistoryIcon,
  Info,
  LogOut,
  LogIn,
  Compass,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useI18n()
  const { isAuthenticated, user, logout } = useAuth()
  const { isTourActive, startTour } = useTour()
  const navigate = useNavigate()
  const location = useLocation()

  // O visitante da demo está em rota demonstrativa pública (RV-DEMO-001) sem estar logado
  const isDemoInspectionRoute =
    location.pathname.startsWith('/inspections/RV-DEMO-001') ||
    location.pathname === '/demo' ||
    location.pathname === '/inspections/demo'

  // Navbar horizontal comum conforme pedido do usuário:
  // (Visão Geral, Fiscalizações, Evidências, Mapa, Verificação, Pendências, Relatórios, Histórico, Sobre)
  const navItems = [
    { to: '/dashboard', label: t('nav.overview'), icon: LayoutDashboard },
    { to: '/inspections', label: t('nav.inspections'), icon: FileCheck2 },
    { to: '/evidence', label: t('nav.evidence'), icon: ImageIcon },
    { to: '/map', label: t('nav.map'), icon: MapIcon },
    { to: '/verification', label: t('nav.verification'), icon: SearchCheck },
    { to: '/gaps', label: t('nav.gaps'), icon: CheckSquare },
    { to: '/reports', label: t('nav.reports'), icon: FileText },
    { to: '/history', label: t('nav.history'), icon: HistoryIcon },
    { to: '/about', label: t('nav.about'), icon: Info },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Define se o cabeçalho deve exibir a navbar horizontal interna:
  // - Usuário autenticado: SEMPRE vê a navbar comum completa em qualquer página interna
  // - Visitante durante o Tour Guiado: vê os itens de navegação para acompanhar as etapas
  // - Visitante na tela de Demo (RV-DEMO-001): vê indicador de demonstração
  // - Visitante deslogado fora de tour: sem navbar interna
  const showInternalNavbar = isAuthenticated || isTourActive

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#143028] flex flex-col font-sans selection:bg-[#E7F2EC] selection:text-[#1B5E3A]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E8E4] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          {/* Left: Logo */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-2 hover:opacity-95 transition-opacity shrink-0"
          >
            <RastroVerdeLogo size="md" />
          </Link>

          {/* Center: Traditional horizontal navbar for authenticated users */}
          {showInternalNavbar ? (
            <nav
              aria-label="Navegação principal"
              className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center max-w-4xl overflow-x-auto py-1"
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  item.to === '/dashboard'
                    ? location.pathname === '/dashboard'
                    : location.pathname.startsWith(item.to)
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#E7F2EC] text-[#1B5E3A] font-bold shadow-xs'
                        : 'text-[#5B6B63] hover:text-[#143028] hover:bg-[#F7F9F8]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>
          ) : !isAuthenticated && isDemoInspectionRoute ? (
            /* Context indicator in demo inspection for visitors */
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-[#0F766E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('demo.nav_badge')}</span>
            </div>
          ) : null}

          {/* Right: Actions (Tour, Lang, Auth) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Tour Guiado Single Button (sempre acessível na demo e autenticado) */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={startTour}
              className="border-[#1B5E3A]/40 bg-[#E7F2EC] hover:bg-[#1B5E3A] text-[#1B5E3A] hover:text-white font-semibold text-xs h-8 px-3 rounded-full transition-all shadow-xs flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="hidden sm:inline">{t('tour.button')}</span>
              <span className="sm:hidden">Tour</span>
            </Button>

            {/* Language toggle: PT | EN (sempre visível) */}
            <LanguageToggle />

            {/* Auth button or user badge */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="hidden xl:inline-block text-xs font-medium text-[#5B6B63] max-w-[130px] truncate">
                  {user?.name || user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs text-[#5B6B63] hover:text-[#B3261E] hover:bg-red-50 flex items-center gap-1.5 h-8 px-2.5 rounded-lg"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('nav.logout')}</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    size="sm"
                    className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-8 px-3 rounded-lg shadow-xs flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{t('nav.login')}</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tablet sub-bar for horizontal navigation (768px <= width < 1024px) when authenticated */}
        {showInternalNavbar && (
          <div className="hidden md:flex lg:hidden border-t border-[#E2E8E4] bg-white px-4 py-1.5 overflow-x-auto justify-start sm:justify-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                item.to === '/dashboard'
                  ? location.pathname === '/dashboard'
                  : location.pathname.startsWith(item.to)
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#E7F2EC] text-[#1B5E3A] font-bold'
                      : 'text-[#5B6B63] hover:text-[#143028]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6">
        {/* Content Area */}
        <main className="flex-1 min-w-0 pb-16 md:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation (only on mobile screen <768px, and ONLY when authenticated) */}
      {isAuthenticated && (
        <nav
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E2E8E4] px-2 py-1.5 flex items-center justify-around shadow-lg"
          aria-label="Navegação móvel"
        >
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[52px] py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="mt-0.5">{t('nav.overview')}</span>
          </NavLink>

          <NavLink
            to="/inspections"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[52px] py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
              }`
            }
          >
            <FileCheck2 className="w-5 h-5" />
            <span className="mt-0.5">{t('nav.inspections')}</span>
          </NavLink>

          <NavLink
            to="/evidence"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[52px] py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
              }`
            }
          >
            <ImageIcon className="w-5 h-5" />
            <span className="mt-0.5">{t('nav.evidence')}</span>
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[52px] py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
              }`
            }
          >
            <MapIcon className="w-5 h-5" />
            <span className="mt-0.5">{t('nav.map')}</span>
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[52px] py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
              }`
            }
          >
            <FileText className="w-5 h-5" />
            <span className="mt-0.5">{t('nav.reports')}</span>
          </NavLink>
        </nav>
      )}

      {/* Cookie / LGPD Banner */}
      <CookieBanner />

      {/* Footer */}
      <footer className="w-full border-t border-[#E2E8E4] bg-white py-6 mt-auto">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 w-full">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <RastroVerdeLogo size="sm" showText={false} />
              <p className="text-xs font-medium text-[#143028]">{t('footer.text')}</p>
              <span className="text-[11px] font-mono font-medium text-[#5B6B63] bg-[#F7F9F8] border border-[#E2E8E4] px-2 py-0.5 rounded-md">
                {t('badge.fictional_demo')}
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-xs font-semibold text-[#5B6B63]">
              <LanguageToggle />
              <span className="text-[#E2E8E4]">•</span>
              <Link to="/about" className="hover:text-[#1B5E3A] transition-colors">
                {t('nav.about')}
              </Link>
              <span className="text-[#E2E8E4]">•</span>
              <Link to="/privacy" className="hover:text-[#1B5E3A] transition-colors">
                {t('about.privacy_link')}
              </Link>
            </div>{' '}
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Layout
