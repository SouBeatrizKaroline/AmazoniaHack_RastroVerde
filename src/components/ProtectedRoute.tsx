import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { useTour } from '@/components/TourProvider'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const { isTourActive } = useTour()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xs font-semibold text-[#5B6B63]">Carregando aplicação...</div>
      </div>
    )
  }

  // Permite acesso se o usuário está autenticado OU se está ativamente percorrendo o tour guiado da demonstração
  if (!isAuthenticated && !isTourActive) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
