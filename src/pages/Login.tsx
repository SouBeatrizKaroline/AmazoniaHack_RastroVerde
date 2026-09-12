import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  LogIn,
  Lock,
  Mail,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react'

export const Login: React.FC = () => {
  const { t } = useI18n()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      toast({ title: 'Acesso autorizado com sucesso!' })
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(
        err?.message ||
          'Credenciais incorretas. Verifique seu e-mail funcional e senha institucional.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-6 sm:my-12 animate-in fade-in duration-300">
      {/* Top back link to landing */}
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6B63] hover:text-[#1B5E3A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('auth.back_to_home')}</span>
        </Link>
      </div>

      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-7 sm:p-9 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <RastroVerdeLogo size="md" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#143028]">
            {t('auth.login_title')}
          </h1>
          <p className="text-xs text-[#5B6B63] max-w-xs mx-auto leading-relaxed">
            {t('auth.login_subtitle')}
          </p>
        </div>

        {/* Demo Fast-Track banner for visitors who landed here */}
        <div className="p-3.5 rounded-2xl bg-[#E7F2EC]/60 border border-[#1B5E3A]/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#1B5E3A] font-medium min-w-0">
            <Compass className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('auth.demo_entry_prompt')}</span>
          </div>
          <Link to="/inspections/RV-DEMO-001" className="shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-[11px] font-bold border-[#1B5E3A]/40 bg-white text-[#1B5E3A] hover:bg-[#1B5E3A] hover:text-white px-2.5 rounded-lg transition-colors"
            >
              Demo RV-DEMO-001 →
            </Button>
          </Link>
        </div>

        {/* Friendly Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#143028] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#5B6B63]" />
              <span>{t('auth.email')}</span>
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agente@meioambiente.gov.br"
              className="h-11 text-xs rounded-xl border-[#E2E8E4] focus-visible:ring-[#1B5E3A] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#143028] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#5B6B63]" />
                <span>{t('auth.password')}</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-[#1B5E3A] hover:underline"
              >
                {t('auth.forgot_password')}
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 text-xs rounded-xl border-[#E2E8E4] pr-10 focus-visible:ring-[#1B5E3A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-11 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Validando acesso...' : t('auth.login_btn')}</span>
          </Button>
        </form>

        {/* Links to Signup */}
        <div className="pt-4 border-t border-[#E2E8E4] text-center space-y-2">
          <p className="text-xs text-[#5B6B63]">
            Ainda não possui credencial de fiscalização?{' '}
            <Link
              to="/signup"
              className="text-[#1B5E3A] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>{t('auth.signup_btn')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>

          <p className="text-[11px] text-[#5B6B63]/80 flex items-center justify-center gap-1.5 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E3A]" />
            <span>{t('auth.security_notice')}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login
