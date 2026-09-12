import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { confirmVerification } = useAuth()

  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (token) {
      confirmVerification(token)
        .then(() => setSuccess(true))
        .catch((err) => setError(err?.message || 'Token expirado ou inválido.'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
      setError('Token de validação não encontrado na URL.')
    }
  }, [token])

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl border border-[#E2E8E4] bg-white shadow-xs text-center space-y-6">
      <div className="flex justify-center mb-2">
        <RastroVerdeLogo size="md" />
      </div>

      <h1 className="text-xl font-bold text-[#143028]">Confirmação de E-mail</h1>

      {loading ? (
        <p className="text-xs text-[#5B6B63]">Validando credencial...</p>
      ) : success ? (
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-xs text-[#5B6B63]">
            Sua conta de agente fiscal foi confirmada com sucesso!
          </p>
          <Link to="/login">
            <Button className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs h-9 px-4">
              Acessar plataforma
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="text-xs text-red-700">{error}</p>
          <Link to="/login">
            <Button variant="outline" className="text-xs h-9">
              Voltar ao login
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
export default VerifyEmail
