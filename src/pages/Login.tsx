import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { LogIn } from 'lucide-react'

export const Login: React.FC = () => {
  const { t } = useI18n()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      setError(err?.message || 'E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-[#E2E8E4] bg-white shadow-xs space-y-6 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <RastroVerdeLogo size="md" />
        </div>
        <h1 className="text-xl font-bold text-[#143028]">{t('auth.login_title')}</h1>
        <p className="text-xs text-[#5B6B63]">
          Acesse a plataforma de fiscalização e elaboração de relatórios
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#143028]">{t('auth.email')}</label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="agente@meioambiente.gov.br"
            className="h-10 text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#143028]">{t('auth.password')}</label>
            <Link to="/forgot-password" className="text-[11px] text-[#1B5E3A] hover:underline">
              {t('auth.forgot_password')}
            </Link>
          </div>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-10 text-xs"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 rounded-xl shadow-xs"
        >
          <LogIn className="w-4 h-4 mr-1.5" />
          <span>{loading ? 'Acessando...' : t('auth.login_btn')}</span>
        </Button>
      </form>

      <div className="pt-4 border-t border-[#E2E8E4] text-center text-xs text-[#5B6B63]">
        <Link to="/signup" className="hover:text-[#1B5E3A] font-semibold">
          {t('auth.no_account')}
        </Link>
      </div>
    </div>
  )
}
export default Login
