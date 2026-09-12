import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  KeyRound,
  ArrowLeft,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'

export const ForgotPassword: React.FC = () => {
  const { t } = useI18n()
  const { requestPasswordReset } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await requestPasswordReset(email)
      setSent(true)
      toast({
        title: 'Instruções enviadas',
        description: 'Se o e-mail estiver cadastrado, você receberá o link de redefinição.',
      })
    } catch (err: any) {
      setError(
        err?.message || 'Falha ao processar a solicitação. Verifique o e-mail institucional.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-6 sm:my-12 animate-in fade-in duration-300">
      {/* Top back link to login */}
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
            {t('auth.forgot_password_title')}
          </h1>
          <p className="text-xs text-[#5B6B63] max-w-xs mx-auto leading-relaxed">
            {t('auth.forgot_password_subtitle')}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {sent ? (
          <div className="p-5 rounded-2xl bg-[#E7F2EC]/60 border border-[#1B5E3A]/25 text-xs text-[#143028] space-y-3.5 text-center animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-[#1B5E3A] text-white flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <p className="font-bold text-sm text-[#143028]">Solicitação registrada com sucesso!</p>

            <p className="text-xs text-[#5B6B63] leading-relaxed">
              Se o endereço <strong className="text-[#143028]">{email}</strong> estiver cadastrado
              na base funcional, enviamos o link seguro de redefinição.
            </p>

            <div className="p-3.5 bg-white rounded-xl border border-[#E2E8E4] text-left space-y-2 text-xs text-[#143028]">
              <span className="font-bold text-[#1B5E3A] block">Passos recomendados:</span>
              <p className="text-[11px] text-[#5B6B63]">
                1. Abra a mensagem na sua caixa funcional e clique no botão de redefinição.
              </p>
              <p className="text-[11px] text-[#5B6B63]">
                2. Caso prefira o modo manual, copie o token informado e insira no formulário de
                senha.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/reset-password">
                <Button
                  size="sm"
                  className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold w-full sm:w-auto h-9 rounded-xl"
                >
                  Inserir token manual
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs font-semibold w-full sm:w-auto h-9 rounded-xl border-[#E2E8E4]"
                >
                  Voltar ao login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-bold h-11 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Processando envio...' : t('auth.forgot_password_btn')}</span>
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-[#E2E8E4] flex items-center justify-between text-xs text-[#5B6B63]">
          <Link
            to="/login"
            className="hover:text-[#1B5E3A] font-semibold inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Voltar ao login</span>
          </Link>
          <Link to="/signup" className="hover:text-[#1B5E3A] font-semibold">
            Criar conta →
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword
