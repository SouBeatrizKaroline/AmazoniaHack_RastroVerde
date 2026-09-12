import React, { useState } from 'react'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 dígitos.')
      return
    }

    const effectiveToken = customToken.trim() || queryToken.trim()
    if (!effectiveToken) {
      setError('Código ou token de recuperação é obrigatório.')
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
      setError(err?.message || 'Token expirado ou inválido.')
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
        <h1 className="text-xl font-bold text-[#143028]">{t('auth.reset_password_title')}</h1>
        <p className="text-xs text-[#5B6B63]">Defina uma nova senha para sua conta institucional</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#143028]">Nova Senha</label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-10 text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#143028]">Confirmar Nova Senha</label>
          <Input
            type="password"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="••••••••"
            className="h-10 text-xs"
          />
        </div>

        {/* Token input when query token is absent */}
        {!queryToken && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1.5">
            <span className="font-semibold">Código / Token de redefinição:</span>
            <Input
              value={customToken}
              onChange={(e) => setCustomToken(e.target.value)}
              placeholder="Cole o token recebido por e-mail aqui"
              className="h-8 text-xs bg-white text-gray-900 border-amber-300"
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={loading || !(customToken.trim() || queryToken.trim())}
          className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 rounded-xl shadow-xs"
        >
          <Lock className="w-4 h-4 mr-1.5" />
          <span>{loading ? 'Redefinindo...' : 'Atualizar Senha'}</span>
        </Button>
      </form>
    </div>
  )
}
export default ResetPassword
