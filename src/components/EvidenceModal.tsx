import React, { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'
import {
  Plus,
  Save,
  X,
  Camera,
  MapPin,
  Calendar,
  Clock,
  User,
  Tag,
  FileText,
  UploadCloud,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { EvidenceRecord } from '@/services/dataService'

interface EvidenceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  inspectionId: string
  evidenceToEdit?: EvidenceRecord | null
  onSave: (data: Partial<EvidenceRecord>) => Promise<void>
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  open,
  onOpenChange,
  inspectionId,
  evidenceToEdit,
  onSave,
}) => {
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    type: 'Fotografia' as EvidenceRecord['type'],
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    latitude: '' as string | number,
    longitude: '' as string | number,
    officer: '',
    description: '',
    tags: '',
    notes: '',
    status: 'Registrada' as EvidenceRecord['status'],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (evidenceToEdit) {
      setFormData({
        code: evidenceToEdit.code || '',
        type: evidenceToEdit.type || 'Fotografia',
        date: evidenceToEdit.date || '',
        time: evidenceToEdit.time || '',
        latitude: evidenceToEdit.latitude != null ? evidenceToEdit.latitude : '',
        longitude: evidenceToEdit.longitude != null ? evidenceToEdit.longitude : '',
        officer: evidenceToEdit.officer || '',
        description: evidenceToEdit.description || '',
        tags: evidenceToEdit.tags || '',
        notes: evidenceToEdit.notes || '',
        status: evidenceToEdit.status || 'Registrada',
      })
    } else {
      const codeNum = Math.floor(100 + Math.random() * 900)
      setFormData({
        code: `EVD-${codeNum}`,
        type: 'Fotografia',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        latitude: -8.0015,
        longitude: -34.0042,
        officer: 'Agente 01 — Beatriz Silva',
        description: '',
        tags: 'campo, fiscalização',
        notes: '',
        status: 'Registrada',
      })
    }
    setErrors({})
  }, [evidenceToEdit, open])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.code.trim()) newErrors.code = 'Código é obrigatório.'
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await onSave({
        ...formData,
        inspection: inspectionId,
        latitude: formData.latitude !== '' ? Number(formData.latitude) : undefined,
        longitude: formData.longitude !== '' ? Number(formData.longitude) : undefined,
      })
      onOpenChange(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#143028] flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#1B5E3A]" />
            <span>{evidenceToEdit ? t('evidence.edit') : t('evidence.add')}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Code & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">{t('evidence.code')} *</label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="h-9 text-xs font-mono"
              />
              {errors.code && <span className="text-[11px] text-red-600">{errors.code}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">
                {t('evidence.filter_by_type')} *
              </label>
              <Select
                value={formData.type}
                onValueChange={(val: any) => setFormData({ ...formData, type: val })}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fotografia">Fotografia</SelectItem>
                  <SelectItem value="Vídeo">Vídeo</SelectItem>
                  <SelectItem value="Áudio">Áudio</SelectItem>
                  <SelectItem value="Documento">Documento</SelectItem>
                  <SelectItem value="Anotação">Anotação</SelectItem>
                  <SelectItem value="Localização">Localização</SelectItem>
                  <SelectItem value="Depoimento">Depoimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.date')}
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.time')}
              </label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="h-9 text-xs"
              />
            </div>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.latitude')}
              </label>
              <Input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="-8.0015"
                className="h-9 text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.longitude')}
              </label>
              <Input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="-34.0042"
                className="h-9 text-xs font-mono"
              />
            </div>
          </div>

          {/* Officer */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#143028]">{t('evidence.officer')}</label>
            <Input
              value={formData.officer}
              onChange={(e) => setFormData({ ...formData, officer: e.target.value })}
              placeholder="Ex: Agente 01 — Beatriz Silva"
              className="h-9 text-xs"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#143028]">Descrição da Evidência *</label>
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva detalhadamente a constatação em campo..."
              className="text-xs"
            />
            {errors.description && (
              <span className="text-[11px] text-red-600">{errors.description}</span>
            )}
          </div>

          {/* Tags & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">{t('evidence.tags')}</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="vegetação, maquinário, solo"
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#143028]">{t('evidence.status')}</label>
              <Select
                value={formData.status}
                onValueChange={(val: any) => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Registrada">Registrada</SelectItem>
                  <SelectItem value="Em revisão">Em revisão</SelectItem>
                  <SelectItem value="Verificada">Verificada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#143028]">{t('evidence.notes')}</label>
            <Textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações complementares ou aferições técnicas..."
              className="text-xs"
            />
          </div>

          <div className="pt-3 border-t border-[#E2E8E4] flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-9 text-xs"
            >
              {t('inspections.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              size="sm"
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-9 px-4 rounded-lg shadow-xs"
            >
              <Save className="w-4 h-4 mr-1.5" />
              <span>Salvar Evidência</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
