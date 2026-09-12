import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { I18nProvider } from '@/lib/i18n'
import { AuthProvider } from '@/lib/auth'
import { TourProvider } from '@/components/TourProvider'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Toaster } from '@/components/ui/toaster'

// Pages
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import InspectionsList from '@/pages/InspectionsList'
import InspectionForm from '@/pages/InspectionForm'
import InspectionDetail from '@/pages/InspectionDetail'
import EvidenceCenter from '@/pages/EvidenceCenter'
import EvidenceMap from '@/pages/EvidenceMap'
import ConsistencyVerification from '@/pages/ConsistencyVerification'
import GapsChecklist from '@/pages/GapsChecklist'
import EvidenceConnections from '@/pages/EvidenceConnections'
import AssistantChat from '@/pages/AssistantChat'
import ReportGenerator from '@/pages/ReportGenerator'
import HistoryLog from '@/pages/HistoryLog'
import About from '@/pages/About'

// Auth Pages
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import VerifyEmail from '@/pages/VerifyEmail'
import ConfirmEmailChange from '@/pages/ConfirmEmailChange'
import NotFound from '@/pages/NotFound'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <TourProvider>
            <Layout>
              <Routes>
                {/* Public Routes: Landing, Sobre, Autenticação */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/confirm-email-change" element={<ConfirmEmailChange />} />

                {/* Demo Routes - Portas abertas para demonstração e pitch sem exigir login */}
                <Route path="/inspections/RV-DEMO-001" element={<InspectionDetail />} />
                <Route path="/demo" element={<Navigate to="/inspections/RV-DEMO-001" replace />} />
                <Route
                  path="/inspections/demo"
                  element={<Navigate to="/inspections/RV-DEMO-001" replace />}
                />
                <Route
                  path="/inspections/undefined"
                  element={<Navigate to="/inspections/RV-DEMO-001" replace />}
                />

                {/* Rotas Operacionais Protegidas - Exigem usuário logado */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inspections"
                  element={
                    <ProtectedRoute>
                      <InspectionsList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inspections/new"
                  element={
                    <ProtectedRoute>
                      <InspectionForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inspections/:id"
                  element={
                    <ProtectedRoute>
                      <InspectionDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inspections/:id/edit"
                  element={
                    <ProtectedRoute>
                      <InspectionForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/evidence"
                  element={
                    <ProtectedRoute>
                      <EvidenceCenter />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <ProtectedRoute>
                      <EvidenceMap />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/connections"
                  element={
                    <ProtectedRoute>
                      <EvidenceConnections />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/verification"
                  element={
                    <ProtectedRoute>
                      <ConsistencyVerification />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gaps"
                  element={
                    <ProtectedRoute>
                      <GapsChecklist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <ReportGenerator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <HistoryLog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assistant"
                  element={
                    <ProtectedRoute>
                      <AssistantChat />
                    </ProtectedRoute>
                  }
                />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            <Toaster />
          </TourProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  )
}
export default App
