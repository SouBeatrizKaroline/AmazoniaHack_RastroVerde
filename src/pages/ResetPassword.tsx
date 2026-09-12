import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Lock } from 'lucide-react'

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
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    const effectiveToken = customToken.trim() || queryToken.trim()
    if (!effectiveToken) {
      setError('Código ou token de recuperação é obrigatório. Cole o token recebido por e-mail.')
      return
    }

    setLoading(true)
    try {
      await confirmPasswordReset(effectiveToken, password, passwordConfirm)
      toast({
        title: 'Senha redefinida com sucesso!',
        description: 'Faça login com a sua nova credencial.',
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
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-[#E2E8E4] bg-white shadow-xs space-y-6 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <RastroVerdeLogo size="md" />
        </div>
        <h1 className="text-xl font-bold text-[#143028]">{t('auth.reset_password_title')}</h1>
        <p className="text-xs text-[#5B6B63]">Defina uma nova senha para sua conta institucional</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 leading-relaxed">
          {error}
        </div>
      )}

      {/* Notice about token status */}
      {queryToken ? (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
          <span>✓ Token de validação detectado automaticamente pelo link.</span>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 space-y-1">
          <span className="font-semibold block">Redefinição via Token Manual:</span>
          <p>Se você copiou o código recebido no e-mail, cole-o no campo abaixo para validar.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Token input field — always available, prefilled if from URL */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#143028]">
              Token / Código de Redefinição *
            </label>
            {queryToken && (
              <span className="text-[10px] text-[#0F766E] font-medium">(Preenchido via URL)</span>
            )}
          </div>
          <Input
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value)}
            placeholder="Cole o token recebido por e-mail"
            className="h-9 text-xs font-mono bg-[#F7F9F8] border-[#E2E8E4]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#143028]">
            Nova Senha (mín. 8 caracteres) *
          </label>
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-10 text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#143028]">Confirmar Nova Senha *</label>
          <Input
            type="password"
            required
            minLength={8}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="••••••••"
            className="h-10 text-xs"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !hasToken}
          className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 rounded-xl shadow-xs"
        >
          <Lock className="w-4 h-4 mr-1.5" />
          <span>{loading ? 'Redefinindo...' : 'Atualizar Senha'}</span>
        </Button>
      </form>

      <div className="pt-4 border-t border-[#E2E8E4] flex items-center justify-between text-xs text-[#5B6B63]">
        <Link to="/forgot-password" className="hover:text-[#1B5E3A] underline">
          Reenviar e-mail
        </Link>
        <Link to="/login" className="hover:text-[#1B5E3A] font-semibold">
          Ir para Login →
        </Link>
      </div>
    </div>
  )
}
export default ResetPassword
