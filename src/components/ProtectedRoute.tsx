import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xs font-semibold text-[#5B6B63]">Carregando aplicação...</div>
      </div>
    )
  }

  // Demo access is completely open without requiring login
  return <>{children}</>
}
