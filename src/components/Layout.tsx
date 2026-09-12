import React, { useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { LanguageToggle } from '@/components/LanguageToggle'
import {
  LayoutDashboard,
  FileCheck2,
  FilePlus2,
  Image as ImageIcon,
  Map as MapIcon,
  SearchCheck,
  CheckSquare,
  Network,
  Bot,
  FileText,
  History as HistoryIcon,
  Info,
  LogOut,
  LogIn,
  Menu,
  X,
  Plus,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useI18n()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const navItems = [
    { to: '/dashboard', label: t('nav.overview'), icon: LayoutDashboard },
    { to: '/inspections', label: t('nav.inspections'), icon: FileCheck2 },
    { to: '/inspections/new', label: t('nav.new_inspection'), icon: FilePlus2 },
    { to: '/evidence', label: t('nav.evidence'), icon: ImageIcon },
    { to: '/map', label: t('nav.map'), icon: MapIcon },
    { to: '/verification', label: t('nav.verification'), icon: SearchCheck },
    { to: '/gaps', label: t('nav.gaps'), icon: CheckSquare },
    { to: '/connections', label: t('nav.connections'), icon: Network },
    { to: '/assistant', label: t('nav.assistant'), icon: Bot },
    { to: '/reports', label: t('nav.reports'), icon: FileText },
    { to: '/history', label: t('nav.history'), icon: HistoryIcon },
    { to: '/about', label: t('nav.about'), icon: Info },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#143028] flex flex-col font-sans selection:bg-[#E7F2EC] selection:text-[#1B5E3A]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E8E4] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity">
            <RastroVerdeLogo size="md" />
          </Link>

          {/* Center / Right controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Demo data pill - persistent transparent badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#E2E8E4] bg-[#F7F9F8] px-3 py-1 text-xs font-medium text-[#5B6B63]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse" />
              <span>{t('badge.demo')}</span>
            </div>

            {/* Language toggle: PT | EN */}
            <LanguageToggle />

            {/* Auth button or user badge */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-block text-xs font-medium text-[#5B6B63] max-w-[140px] truncate">
                  {user?.name || user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs text-[#5B6B63] hover:text-[#B3261E] hover:bg-red-50 flex items-center gap-1.5 h-8 px-2.5"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('nav.logout')}</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  size="sm"
                  className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-8 px-3 rounded-lg shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1" />
                  {t('nav.login')}
                </Button>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2 rounded-lg text-[#5B6B63] hover:bg-[#F7F9F8] hover:text-[#143028]"
              aria-label="Abrir menu de navegação"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar (>=1024px) */}
        {location.pathname !== '/' &&
          location.pathname !== '/login' &&
          location.pathname !== '/signup' && (
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24 rounded-2xl border border-[#E2E8E4] bg-white p-3 shadow-xs">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#5B6B63]">
                  {t('nav.overview')} &amp; Trilha
                </div>
                <nav className="space-y-1">
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
                        className={({ isActive: matchActive }) =>
                          `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                            matchActive
                              ? 'bg-[#E7F2EC] text-[#1B5E3A] font-semibold shadow-xs'
                              : 'text-[#5B6B63] hover:bg-[#F7F9F8] hover:text-[#143028]'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    )
                  })}
                </nav>

                {/* Quick Case Shortcut */}
                <div className="mt-4 pt-4 border-t border-[#E2E8E4] px-3">
                  <Link
                    to="/inspections/RV-DEMO-001"
                    className="block rounded-lg bg-[#F7F9F8] border border-[#E2E8E4] p-2.5 hover:border-[#1B5E3A] transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A]">
                      <Compass className="w-3.5 h-3.5" />
                      <span>RV-DEMO-001</span>
                    </div>
                    <div className="text-[11px] text-[#5B6B63] mt-0.5 line-clamp-1">
                      APA Setor Norte (Demo)
                    </div>
                  </Link>
                </div>
              </div>
            </aside>
          )}

        {/* Content Area */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-6">{children}</main>
      </div>

      {/* Mobile Drawer (Slide-in) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col p-5 z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8E4]">
              <RastroVerdeLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-md text-[#5B6B63]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                        isActive
                          ? 'bg-[#E7F2EC] text-[#1B5E3A] font-semibold'
                          : 'text-[#5B6B63] hover:bg-[#F7F9F8]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>

            <div className="pt-4 border-t border-[#E2E8E4] flex flex-col gap-2">
              <div className="text-xs text-[#5B6B63]">{t('badge.demo')}</div>
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleLogout()
                    setMobileDrawerOpen(false)
                  }}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 text-xs"
                >
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  {t('nav.logout')}
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileDrawerOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-[#1B5E3A] border-[#1B5E3A]/30 text-xs"
                  >
                    <LogIn className="w-3.5 h-3.5 mr-2" />
                    {t('nav.login')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation (<=640px) */}
      {location.pathname !== '/' &&
        location.pathname !== '/login' &&
        location.pathname !== '/signup' && (
          <nav
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E2E8E4] px-2 py-1.5 flex items-center justify-around shadow-lg"
            aria-label="Navegação móvel"
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] py-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="mt-0.5">{t('nav.home')}</span>
            </NavLink>

            <NavLink
              to="/inspections"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] py-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
                }`
              }
            >
              <FileCheck2 className="w-5 h-5" />
              <span className="mt-0.5">{t('nav.inspections')}</span>
            </NavLink>

            {/* Centered Prominent Quick Add Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="-mt-5 flex items-center justify-center w-12 h-12 rounded-full bg-[#1B5E3A] text-white shadow-md hover:bg-[#14502F] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#1B5E3A] focus:ring-offset-2"
                  aria-label={t('nav.quick_new')}
                >
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="top" className="w-48 mb-2">
                <DropdownMenuItem onClick={() => navigate('/inspections/new')}>
                  <FilePlus2 className="w-4 h-4 mr-2 text-[#1B5E3A]" />
                  <span>{t('nav.quick_new_insp')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/evidence')}>
                  <ImageIcon className="w-4 h-4 mr-2 text-[#0F766E]" />
                  <span>{t('nav.quick_new_evd')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="/evidence"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] py-1 text-[11px] font-medium transition-colors ${
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
                `flex flex-col items-center justify-center min-w-[56px] py-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-[#1B5E3A] font-semibold' : 'text-[#5B6B63]'
                }`
              }
            >
              <MapIcon className="w-5 h-5" />
              <span className="mt-0.5">{t('nav.map')}</span>
            </NavLink>
          </nav>
        )}

      {/* Footer */}
      <footer className="w-full border-t border-[#E2E8E4] bg-white py-6 mt-auto">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 w-full">
            <RastroVerdeLogo size="sm" showText={false} />
            <p className="text-xs font-medium text-[#143028]">{t('footer.text')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Layout
