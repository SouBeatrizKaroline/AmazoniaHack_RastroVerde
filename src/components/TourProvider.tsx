import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Camera,
  MapPin,
  Clock,
  SearchCheck,
  CheckSquare,
  FileText,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface TourStep {
  id?: string
  route: string
  titleKey: string
  descKey: string
  badgeKey?: string
  icon: any
  selector?: string
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'step-inspection',
    route: '/inspections/RV-DEMO-001',
    titleKey: 'tour.step1_title',
    descKey: 'tour.step1_desc',
    badgeKey: 'tour.step1_badge',
    icon: FileCheck2,
  },
  {
    id: 'step-evidence',
    route: '/evidence',
    titleKey: 'tour.step2_title',
    descKey: 'tour.step2_desc',
    badgeKey: 'tour.step2_badge',
    icon: Camera,
  },
  {
    id: 'step-map',
    route: '/map',
    titleKey: 'tour.step3_title',
    descKey: 'tour.step3_desc',
    badgeKey: 'tour.step3_badge',
    icon: MapPin,
  },
  {
    id: 'step-history',
    route: '/history',
    titleKey: 'tour.step4_title',
    descKey: 'tour.step4_desc',
    badgeKey: 'tour.step4_badge',
    icon: Clock,
  },
  {
    id: 'step-verification',
    route: '/verification',
    titleKey: 'tour.step5_title',
    descKey: 'tour.step5_desc',
    badgeKey: 'tour.step5_badge',
    icon: SearchCheck,
  },
  {
    id: 'step-gaps',
    route: '/gaps',
    titleKey: 'tour.step6_title',
    descKey: 'tour.step6_desc',
    badgeKey: 'tour.step6_badge',
    icon: CheckSquare,
  },
  {
    id: 'step-reports',
    route: '/reports',
    titleKey: 'tour.step7_title',
    descKey: 'tour.step7_desc',
    badgeKey: 'tour.step7_badge',
    icon: FileText,
  },
  {
    id: 'step-traceability-anchor',
    route: '/evidence?source=EVD-014',
    titleKey: 'tour.step8_title',
    descKey: 'tour.step8_desc',
    badgeKey: 'tour.step8_badge',
    icon: Compass,
  },
]

interface TourContextType {
  isTourActive: boolean
  currentStepIndex: number
  startTour: () => void
  nextStep: () => void
  prevStep: () => void
  endTour: () => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState<boolean>(false)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()

  const goToStep = (idx: number) => {
    const targetStep = TOUR_STEPS[idx]
    if (!targetStep) return
    setCurrentStepIndex(idx)
    navigate(targetStep.route)

    // Se o passo for o 8 (EVD-014), emitir evento com leve retardo para abrir o modal
    if (targetStep.id === 'step-traceability-anchor') {
      const emitTourOpen = () => {
        window.dispatchEvent(new CustomEvent('tour-open-evidence', { detail: { code: 'EVD-014' } }))
      }
      setTimeout(emitTourOpen, 350)
      setTimeout(emitTourOpen, 800)
    }
  }

  const startTour = () => {
    setIsTourActive(true)
    goToStep(0)
  }

  const nextStep = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      goToStep(currentStepIndex + 1)
    } else {
      endTour()
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1)
    }
  }

  const endTour = () => {
    setIsTourActive(false)
    setCurrentStepIndex(0)
  }

  const currentStep = TOUR_STEPS[currentStepIndex]
  const Icon = currentStep?.icon || Compass

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        currentStepIndex,
        startTour,
        nextStep,
        prevStep,
        endTour,
      }}
    >
      {children}

      {/* Floating Tour Assistant / Modal Widget */}
      {isTourActive && (
        <div className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-50 max-w-[calc(100vw-24px)] w-[360px] sm:w-[390px] bg-white rounded-3xl border-2 border-[#1B5E3A] shadow-2xl p-4 sm:p-5 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8E4]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E3A] block">
                    {t('tour.button_pitch')}
                  </span>
                  {currentStep.badgeKey && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 uppercase">
                      {t(currentStep.badgeKey)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-[#5B6B63]">
                  {t('tour.step_of')
                    .replace('{current}', String(currentStepIndex + 1))
                    .replace('{total}', String(TOUR_STEPS.length))}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={endTour}
              className="text-gray-400 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              title={t('tour.end')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Body */}
          <div className="py-3 space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1B5E3A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-sm font-bold text-[#143028] leading-tight">
                  {t(currentStep.titleKey)}
                </h4>
                <p className="text-xs text-[#5B6B63] leading-relaxed">{t(currentStep.descKey)}</p>
              </div>
            </div>
          </div>

          {/* Stepper Dots (Interactive Clickable) */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            {TOUR_STEPS.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToStep(idx)}
                title={`Ir para passo ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-[#1B5E3A]'
                    : idx < currentStepIndex
                      ? 'w-2 bg-[#0F766E]'
                      : 'w-2 bg-[#E2E8E4]'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#E2E8E4] flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentStepIndex === 0}
              onClick={prevStep}
              className="h-8 text-xs border-[#E2E8E4] px-2.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>{t('tour.prev')}</span>
            </Button>

            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={endTour}
                className="h-8 text-xs text-[#5B6B63] hover:text-[#B3261E] px-2"
              >
                <span>{t('tour.end')}</span>
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={nextStep}
                className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-8 px-3 rounded-lg shadow-xs"
              >
                <span>
                  {currentStepIndex === TOUR_STEPS.length - 1 ? t('tour.finish') : t('tour.next')}
                </span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </TourContext.Provider>
  )
}

export const useTour = () => {
  const ctx = useContext(TourContext)
  if (!ctx) throw new Error('useTour must be used within a TourProvider')
  return ctx
}
