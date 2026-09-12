import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { KeyRound, ArrowLeft } from 'lucide-react'

export const ForgotPassword: React.FC = () => {
  const { t } = useI18n()
  const { requestPasswordReset } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await requestPasswordReset(email)
      setSent(true)
      toast({
        title: 'Instruções enviadas',
        description: 'Se o e-mail estiver cadastrado, você receberá o link de redefinição.',
      })
    } catch (err: any) {
      toast({
        title: 'Erro ao solicitar recuperação',
        description: err?.message || 'Verifique o e-mail digitado.',
        variant: 'destructive',
      })
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
        <h1 className="text-xl font-bold text-[#143028]">{t('auth.forgot_password_title')}</h1>
        <p className="text-xs text-[#5B6B63]">
          Informe seu e-mail funcional para receber o link seguro de redefinição
        </p>
      </div>

      {sent ? (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-3 text-center">
          <p className="font-semibold">Solicitação registrada com sucesso!</p>
          <p className="text-[11px] text-emerald-800">
            Verifique a caixa de entrada do e-mail <strong>{email}</strong> para prosseguir com a
            redefinição de senha.
          </p>
          <Link to="/login">
            <Button size="sm" variant="outline" className="mt-2 text-xs">
              Voltar ao login
            </Button>
          </Link>
        </div>
      ) : (
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 rounded-xl shadow-xs"
          >
            <KeyRound className="w-4 h-4 mr-1.5" />
            <span>{loading ? 'Enviando...' : t('auth.forgot_password_btn')}</span>
          </Button>
        </form>
      )}

      <div className="pt-4 border-t border-[#E2E8E4] text-center text-xs text-[#5B6B63]">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 hover:text-[#1B5E3A] font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao login</span>
        </Link>
      </div>
    </div>
  )
}
export default ForgotPassword
