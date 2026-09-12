import React, { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import {
  Camera,
  Video,
  Mic,
  FileText,
  FileEdit,
  MapPin,
  User,
  Tag,
  Clock,
  Calendar,
  Eye,
  Trash2,
  Edit2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { EvidenceRecord } from '@/services/dataService'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface EvidenceCardProps {
  evidence: EvidenceRecord
  onEdit?: (evd: EvidenceRecord) => void
  onDelete?: (evd: EvidenceRecord) => void
  onSelect?: (evd: EvidenceRecord) => void
  isHighlighted?: boolean
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onEdit,
  onDelete,
  onSelect,
  isHighlighted = false,
}) => {
  const { t } = useI18n()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
    Fotografia: { icon: Camera, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    Vídeo: { icon: Video, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    Áudio: { icon: Mic, color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
    Documento: { icon: FileText, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    Anotação: { icon: FileEdit, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
    Localização: { icon: MapPin, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
    Depoimento: { icon: User, color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  }

  const currentType = typeConfig[evidence.type] || typeConfig.Fotografia
  const Icon = currentType.icon

  const tagsList = evidence.tags
    ? evidence.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : []

  return (
    <>
      <div
        className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-xs transition-all hover:shadow-md ${
          isHighlighted
            ? 'border-[#1B5E3A] ring-2 ring-[#1B5E3A]/20 bg-[#E7F2EC]/20'
            : 'border-[#E2E8E4] hover:border-[#1B5E3A]'
        }`}
      >
        <div className="space-y-3">
          {/* Header row: code, type badge, status */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2.5 py-1 rounded-md">
              {evidence.code}
            </span>

            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${currentType.bg} ${currentType.color}`}
              >
                <Icon className="w-3 h-3" />
                <span>{evidence.type}</span>
              </span>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  evidence.status === 'Verificada'
                    ? 'bg-emerald-100 text-emerald-800'
                    : evidence.status === 'Em revisão'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-700'
                }`}
              >
                {evidence.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm font-medium text-[#143028] leading-snug">{evidence.description}</p>

          {/* Simulated Photo Thumbnail for Photography */}
          {evidence.type === 'Fotografia' && (
            <div className="relative h-28 rounded-xl overflow-hidden border border-[#E2E8E4] bg-gradient-to-tr from-[#1B5E3A]/20 via-[#0F766E]/15 to-[#B45309]/15 flex items-center justify-center group/img">
              {/* Geometric pattern simulation */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id={`grid-${evidence.code}`}
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect width="20" height="20" fill="none" stroke="#1B5E3A" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${evidence.code})`} />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center text-xs font-semibold text-[#1B5E3A] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E2E8E4] shadow-xs">
                <Camera className="w-4 h-4 mb-0.5" />
                <span>Registro Fotográfico de Campo</span>
                <span className="text-[10px] text-[#5B6B63] font-mono">{evidence.code}</span>
              </div>
            </div>
          )}

          {/* Metadata pill box */}
          <div className="p-2.5 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-[11px] space-y-1 text-[#5B6B63]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                <span>
                  {evidence.date} • {evidence.time}
                </span>
              </span>
              {evidence.latitude != null && evidence.longitude != null && (
                <span className="flex items-center gap-1 font-mono text-[#0F766E] font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {evidence.latitude.toFixed(4)}, {evidence.longitude.toFixed(4)}
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[#143028]">
              <User className="w-3 h-3 text-[#5B6B63]" />
              <span className="truncate">
                {evidence.officer ? (
                  <span>{evidence.officer}</span>
                ) : (
                  <span className="text-[#B3261E] font-semibold italic">
                    ⚠ Responsável não identificado (Lacuna)
                  </span>
                )}
              </span>
            </div>

            {evidence.notes && (
              <div className="text-[10px] text-[#5B6B63] line-clamp-1 italic pt-0.5 border-t border-[#E2E8E4]/60">
                "{evidence.notes}"
              </div>
            )}
          </div>

          {/* Tags */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-[10px] font-medium text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md"
                >
                  #{tag.replace(/^#/, '')}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-4 border-t border-[#E2E8E4] flex items-center justify-between gap-2">
          {onSelect && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(evidence)}
              className="h-8 px-2.5 text-xs text-[#143028] border-[#E2E8E4] hover:bg-[#F7F9F8]"
            >
              <Eye className="w-3.5 h-3.5 mr-1 text-[#1B5E3A]" />
              <span>{t('evidence.view_detail')}</span>
            </Button>
          )}

          <div className="flex items-center gap-1 ml-auto">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(evidence)}
                className="h-8 px-2 text-xs text-[#5B6B63] hover:text-[#143028]"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
            )}

            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteConfirmOpen(true)}
                className="h-8 px-2 text-xs text-[#5B6B63] hover:text-[#B3261E] hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for Removal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#B3261E]">
              {t('evidence.confirm_delete_title')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-[#5B6B63]">
              {t('evidence.confirm_delete_desc')} Código:{' '}
              <strong className="font-mono text-[#143028]">{evidence.code}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">{t('inspections.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setDeleteConfirmOpen(false)
                onDelete?.(evidence)
              }}
              className="bg-[#B3261E] hover:bg-red-800 text-white text-xs"
            >
              {t('evidence.remove')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
