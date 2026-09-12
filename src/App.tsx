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
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/confirm-email-change" element={<ConfirmEmailChange />} />

                {/* Operational Routes - Public by design for demo and field inspection accessibility */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inspections" element={<InspectionsList />} />
                <Route path="/inspections/new" element={<InspectionForm />} />
                <Route path="/inspections/:id" element={<InspectionDetail />} />
                <Route path="/inspections/:id/edit" element={<InspectionForm />} />
                <Route path="/evidence" element={<EvidenceCenter />} />
                <Route path="/map" element={<EvidenceMap />} />
                <Route path="/connections" element={<EvidenceConnections />} />
                <Route path="/verification" element={<ConsistencyVerification />} />
                <Route path="/gaps" element={<GapsChecklist />} />
                <Route path="/reports" element={<ReportGenerator />} />
                <Route path="/history" element={<HistoryLog />} />
                <Route path="/assistant" element={<AssistantChat />} />
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
