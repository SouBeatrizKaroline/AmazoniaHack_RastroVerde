import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react'

export const ResetPassword: React.FC = () => {
  const { t } = useI18n()
  const [searchParams] = useSearchParams()
  const queryToken = searchParams.get('token') || ''
  const [customToken, setCustomToken] = useState(queryToken)
  const { confirmPasswordReset } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Keep customToken synced if query changes
  useEffect(() => {
    if (queryToken) {
      setCustomToken(queryToken)
    }
  }, [queryToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('A confirmação de senha não confere com a nova senha digitada.')
      return
    }

    if (password.length < 8) {
      setError('Por segurança institucional, a senha deve ter no mínimo 8 caracteres.')
      return
    }

    const effectiveToken = customToken.trim() || queryToken.trim()
    if (!effectiveToken) {
      setError('O token ou código de recuperação é obrigatório. Cole o código recebido por e-mail.')
      return
    }

    setLoading(true)
    try {
      await confirmPasswordReset(effectiveToken, password, passwordConfirm)
      toast({
        title: 'Senha redefinida com sucesso!',
        description: 'Faça login com a sua nova credencial institucional.',
      })
      navigate('/login')
    } catch (err: any) {
      setError(
        err?.message ||
          'Token expirado ou inválido. Solicite uma nova redefinição se o token tiver vencido.',
      )
    } finally {
      setLoading(false)
    }
  }

  const hasToken = !!(customToken.trim() || queryToken.trim())

  return (
    <div className="w-full max-w-md mx-auto my-6 sm:my-12 animate-in fade-in duration-300">
      <div className="mb-4">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6B63] hover:text-[#1B5E3A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('auth.back_to_login')}</span>
        </Link>
      </div>

      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-7 sm:p-9 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <RastroVerdeLogo size="md" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#143028]">
            {t('auth.reset_password_title')}
          </h1>
          <p className="text-xs text-[#5B6B63] max-w-xs mx-auto leading-relaxed">
            {t('auth.reset_password_subtitle')}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Notice about token status */}
        {queryToken ? (
          <div className="p-3 rounded-2xl bg-[#E7F2EC]/60 border border-[#1B5E3A]/25 text-xs text-[#1B5E3A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Token de redefinição detectado automaticamente pelo link.</span>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-semibold block">Inserção Manual de Token:</span>
            <p className="text-[11px] text-amber-800">
              Cole o código alfanumérico enviado no e-mail de recuperação.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#143028] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#5B6B63]" />
                <span>Token de Recuperação *</span>
              </label>
              {queryToken && (
                <span className="text-[10px] text-[#0F766E] font-medium">(URL validada)</span>
              )}
            </div>
            <Input
              value={customToken}
              onChange={(e) => setCustomToken(e.target.value)}
              placeholder="Cole o token recebido por e-mail"
              className="h-10 text-xs font-mono bg-[#F7F9F8] border-[#E2E8E4] rounded-xl focus-visible:ring-[#1B5E3A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#143028] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#5B6B63]" />
              <span>Nova Senha (mín. 8 caracteres) *</span>
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#143028] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#5B6B63]" />
              <span>Confirmar Nova Senha *</span>
            </label>
            <Input
              type="password"
              required
              minLength={8}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="••••••••"
              className="h-11 text-xs rounded-xl border-[#E2E8E4] focus-visible:ring-[#1B5E3A] transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !hasToken}
            className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-11 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Redefinindo...' : 'Atualizar Credencial'}</span>
          </Button>
        </form>

        <div className="pt-4 border-t border-[#E2E8E4] flex items-center justify-between text-xs text-[#5B6B63]">
          <Link to="/forgot-password" className="hover:text-[#1B5E3A] underline">
            Reenviar e-mail
          </Link>
          <Link to="/login" className="hover:text-[#1B5E3A] font-semibold">
            Ir para login →
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword
