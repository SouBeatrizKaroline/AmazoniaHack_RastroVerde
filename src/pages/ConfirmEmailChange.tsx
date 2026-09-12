import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { RastroVerdeLogo } from '@/components/RastroVerdeLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

export const ConfirmEmailChange: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { confirmEmailChange } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await confirmEmailChange(token, password)
      toast({
        title: 'E-mail alterado com sucesso!',
        description: 'Faça login com seu novo endereço institucional.',
      })
      navigate('/login')
    } catch (err: any) {
      setError(err?.message || 'Token de alteração expirado ou senha inválida.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl border border-[#E2E8E4] bg-white shadow-xs space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <RastroVerdeLogo size="md" />
        </div>
        <h1 className="text-xl font-bold text-[#143028]">Confirmar Novo E-mail</h1>
        <p className="text-xs text-[#5B6B63]">
          Digite sua senha atual para confirmar a alteração do e-mail funcional
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#143028]">Senha Atual</label>
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
          disabled={loading || !token}
          className="w-full bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 rounded-xl"
        >
          {loading ? 'Confirmando...' : 'Confirmar Alteração'}
        </Button>
      </form>
    </div>
  )
}
export default ConfirmEmailChange
