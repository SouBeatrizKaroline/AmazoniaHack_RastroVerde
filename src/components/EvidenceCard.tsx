import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { getEvidenceFileUrl, type EvidenceRecord } from '@/services/dataService'
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
        className={`flex flex-col justify-between rounded-3xl border bg-white p-5 sm:p-5.5 shadow-xs transition-all duration-200 hover:shadow-md ${
          isHighlighted
            ? 'border-[#1B5E3A] ring-2 ring-[#1B5E3A]/25 bg-gradient-to-b from-[#E7F2EC]/30 to-white'
            : 'border-[#E2E8E4] hover:border-[#1B5E3A]/60'
        }`}
      >
        <div className="space-y-3.5">
          {/* Header row: code, type badge, status */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2.5 py-1 rounded-lg border border-[#1B5E3A]/15">
              {evidence.code}
            </span>

            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${currentType.bg} ${currentType.color}`}
              >
                <Icon className="w-3 h-3" />
                <span>{evidence.type}</span>
              </span>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  evidence.status === 'Verificada'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : evidence.status === 'Em revisão'
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                {evidence.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm font-semibold text-[#143028] leading-snug">
            {evidence.description}
          </p>

          {/* File Thumbnail / Media Display */}
          {evidence.file ? (
            <div className="relative h-34 rounded-2xl overflow-hidden border border-[#E2E8E4] bg-[#F7F9F8] flex items-center justify-center">
              {evidence.file.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
                <img
                  src={
                    getEvidenceFileUrl(evidence, '400x300') || getEvidenceFileUrl(evidence) || ''
                  }
                  alt={`Evidência fotográfica ${evidence.code}: ${evidence.description || 'Registro de campo'}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : evidence.file.match(/\.(mp4|webm|mov)$/i) ? (
                <div className="flex flex-col items-center p-3 text-center">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0F766E] border border-teal-200 flex items-center justify-center mb-1.5 shadow-2xs">
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#143028] max-w-[200px] truncate">
                    {evidence.file}
                  </span>
                  <span className="text-[10px] text-[#5B6B63] font-mono mt-0.5">
                    {t('workspace.attached_video')}
                  </span>
                </div>
              ) : evidence.file.match(/\.(mp3|wav|ogg|m4a)$/i) ? (
                <div className="flex flex-col items-center p-3 text-center">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center mb-1.5 shadow-2xs">
                    <Mic className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#143028] max-w-[200px] truncate">
                    {evidence.file}
                  </span>
                  <span className="text-[10px] text-[#5B6B63] font-mono mt-0.5">
                    {t('workspace.attached_audio')}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center p-3 text-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1B5E3A] border border-emerald-200 flex items-center justify-center mb-1.5 shadow-2xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#143028] max-w-[200px] truncate">
                    {evidence.file}
                  </span>
                  <a
                    href={getEvidenceFileUrl(evidence) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#1B5E3A] font-bold mt-1 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{t('workspace.open_document')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            evidence.type === 'Fotografia' && (
              <div className="relative h-28 rounded-2xl overflow-hidden border border-[#E2E8E4] bg-gradient-to-tr from-[#1B5E3A]/15 via-[#0F766E]/10 to-amber-500/10 flex items-center justify-center group/img">
                <div className="relative z-10 flex flex-col items-center text-xs font-semibold text-[#1B5E3A] bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#E2E8E4] shadow-2xs">
                  <Camera className="w-4 h-4 mb-0.5 text-[#1B5E3A]" />
                  <span>{t('workspace.evidence_field_photo')}</span>
                  <span className="text-[10px] text-[#5B6B63] font-mono">{evidence.code}</span>
                </div>
              </div>
            )
          )}

          {/* Metadata pill box */}
          <div className="p-3 rounded-2xl bg-[#F9FCFA] border border-[#E2E8E4] text-[11px] space-y-1.5 text-[#5B6B63]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-[#5B6B63]" />
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
                  <span className="font-medium">{evidence.officer}</span>
                ) : (
                  <span className="text-[#B3261E] font-semibold italic">
                    {t('workspace.unidentified_officer_warning')}
                  </span>
                )}
              </span>
            </div>

            {evidence.notes && (
              <div className="text-[11px] text-[#5B6B63] line-clamp-1 italic pt-1 border-t border-[#E2E8E4]/60">
                "{evidence.notes}"
              </div>
            )}
          </div>

          {/* Tags */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-[10px] font-medium text-[#1B5E3A] bg-[#E7F2EC] px-2.5 py-0.5 rounded-full border border-[#1B5E3A]/15"
                >
                  #{tag.replace(/^#/, '')}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Action Buttons com alvos de toque >=44px no mobile */}
        <div className="pt-3.5 mt-3.5 border-t border-[#E2E8E4] flex flex-wrap items-center justify-between gap-2">
          {onSelect && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(evidence)}
              className="min-h-[44px] px-3.5 text-xs font-bold text-[#143028] border-[#E2E8E4] bg-white hover:bg-[#F7F9F8] rounded-xl shadow-2xs hover:shadow-xs transition-all focus:ring-2 focus:ring-[#1B5E3A]/40"
            >
              <Eye className="w-4 h-4 mr-1.5 text-[#1B5E3A]" />
              <span>{t('evidence.view_detail')}</span>
            </Button>
          )}

          {evidence.inspection && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="min-h-[44px] px-3 text-xs font-bold text-[#1B5E3A] hover:bg-[#E7F2EC] rounded-xl transition-all"
              title="Ver minuta de relatório vinculada"
            >
              <Link to={`/reports/${evidence.inspection}`}>
                <FileText className="w-4 h-4 mr-1 text-[#1B5E3A]" />
                <span>Ver na Minuta</span>
              </Link>
            </Button>
          )}

          <div className="flex items-center gap-1.5 ml-auto">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(evidence)}
                className="min-h-[44px] min-w-[44px] p-0 text-xs text-[#5B6B63] hover:text-[#143028] hover:bg-[#F7F9F8] rounded-xl transition-colors focus:ring-2 focus:ring-[#1B5E3A]/40"
                aria-label={t('evidence.edit')}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}

            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteConfirmOpen(true)}
                className="min-h-[44px] min-w-[44px] p-0 text-xs text-[#5B6B63] hover:text-[#B3261E] hover:bg-rose-50 rounded-xl transition-colors focus:ring-2 focus:ring-red-400/40"
                aria-label={t('evidence.remove')}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>{' '}
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
