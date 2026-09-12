import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { UserPlus } from 'lucide-react'

export const Signup: React.FC = () => {
  const { t } = useI18n()
  const { signup } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    setLoading(true)
    try {
      await signup(name, email, password)
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Um e-mail de confirmação foi enviado para sua caixa de entrada.',
      })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Falha ao criar conta. Verifique os dados.')
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
        <h1 className="text-xl font-bold text-[#143028]">{t('auth.signup_title')}</h1>
        <p className="text-xs text-[#5B6B63]">Cadastro de agentes e servidores de fiscalização</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#143028]">{t('auth.name')}</label>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Beatriz Silva"
            className="h-10 text-xs"
          />
        </div>

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
          <label className="text-xs font-semibold text-[#143028]">
            {t('auth.password')} (mínimo 8 dígitos)
          </label>
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
          <label className="text-xs font-semibold text-[#143028]">
            {t('auth.confirm_password')}
          </label>
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="h-10 text-xs"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 rounded-xl shadow-xs"
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          <span>{loading ? 'Cadastrando...' : t('auth.signup_btn')}</span>
        </Button>
      </form>

      <div className="pt-4 border-t border-[#E2E8E4] text-center text-xs text-[#5B6B63]">
        <Link to="/login" className="hover:text-[#1B5E3A] font-semibold">
          {t('auth.have_account')}
        </Link>
      </div>
    </div>
  )
}
export default Signup
