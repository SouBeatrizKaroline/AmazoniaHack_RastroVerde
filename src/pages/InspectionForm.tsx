import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  FilePlus2,
  ArrowLeft,
  Save,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  User,
  Shield,
  FileText,
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
import { useToast } from '@/hooks/use-toast'
import {
  createInspection,
  updateInspection,
  getInspectionById,
  type InspectionRecord,
} from '@/services/dataService'

export const InspectionForm: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id_number: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    agent: '',
    team: '',
    location: '',
    municipality: '',
    state: '',
    latitude: '' as string | number,
    longitude: '' as string | number,
    occurrence_type: 'Desmatamento',
    description: '',
    notes: '',
    status: 'Em análise' as InspectionRecord['status'],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && id) {
      loadExisting(id)
    } else {
      // Auto-generate identifier suggestion
      const randomSuffix = Math.floor(100 + Math.random() * 900)
      setFormData((prev) => ({
        ...prev,
        id_number: `RV-2026-${randomSuffix}`,
      }))
    }
  }, [id, isEditing])

  const loadExisting = async (inspId: string) => {
    try {
      const data = await getInspectionById(inspId)
      setFormData({
        id_number: data.id_number || '',
        date: data.date || '',
        time: data.time || '',
        agent: data.agent || '',
        team: data.team || '',
        location: data.location || '',
        municipality: data.municipality || '',
        state: data.state || '',
        latitude: data.latitude || '',
        longitude: data.longitude || '',
        occurrence_type: data.occurrence_type || 'Desmatamento',
        description: data.description || '',
        notes: data.notes || '',
        status: data.status || 'Em análise',
      })
    } catch (err) {
      toast({
        title: 'Erro ao carregar fiscalização',
        variant: 'destructive',
      })
      navigate('/inspections')
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.id_number.trim()) {
      newErrors.id_number = 'Número identificador é obrigatório.'
    }
    if (!formData.date.trim()) {
      newErrors.date = 'Data é obrigatória.'
    }
    if (!formData.agent.trim()) {
      newErrors.agent = 'Agente responsável é obrigatório.'
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Local da ocorrência é obrigatório.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const payload: Partial<InspectionRecord> = {
        ...formData,
        latitude: formData.latitude !== '' ? Number(formData.latitude) : undefined,
        longitude: formData.longitude !== '' ? Number(formData.longitude) : undefined,
      }

      if (isEditing && id) {
        await updateInspection(id, payload)
        toast({
          title: t('inspections.updated_success'),
        })
        navigate(`/inspections/${formData.id_number}`)
      } else {
        const created = await createInspection(payload)
        toast({
          title: t('inspections.created_success'),
        })
        navigate(`/inspections/${created.id_number}`)
      }
    } catch (err: any) {
      console.error(err)
      const msg = err?.data?.data
        ? Object.entries(err.data.data)
            .map(([k, v]: any) => `${k}: ${v?.message}`)
            .join(', ')
        : err?.message || 'Falha ao salvar fiscalização.'
      toast({
        title: 'Erro de validação',
        description: msg,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <Link
          to="/inspections"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6B63] hover:text-[#143028]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para fiscalizações</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-[#E2E8E4] bg-white p-6 sm:p-8 shadow-xs">
        <div className="border-b border-[#E2E8E4] pb-4 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B5E3A] mb-1">
            <FilePlus2 className="w-4 h-4" />
            <span>Formulário de Vistoria de Campo</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#143028]">
            {isEditing ? 'Editar Fiscalização' : t('inspections.new')}
          </h1>
          <p className="text-xs text-[#5B6B63] mt-1">
            Preencha os dados institucionais da fiscalização para iniciar a coleta e auditoria de
            evidências.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identificação e Data */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.id_number')} *
              </label>
              <Input
                value={formData.id_number}
                onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                placeholder="Ex: RV-2026-001"
                className="h-10 text-xs font-mono"
              />
              {errors.id_number && (
                <span className="text-[11px] text-red-600">{errors.id_number}</span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.date')} *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-10 text-xs"
              />
              {errors.date && <span className="text-[11px] text-red-600">{errors.date}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.time')}
              </label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="h-10 text-xs"
              />
            </div>
          </div>

          {/* Agente e Equipe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.agent')} *
              </label>
              <Input
                value={formData.agent}
                onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                placeholder="Ex: Agente 01 — Léo / Agente 02 — Ana"
                className="h-10 text-xs"
              />
              {errors.agent && <span className="text-[11px] text-red-600">{errors.agent}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.team')}
              </label>
              <Input
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                placeholder="Ex: Equipe Tática Ambiental"
                className="h-10 text-xs"
              />
            </div>
          </div>

          {/* Local, Município e UF */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#143028]">
              {t('inspections.location')} *
            </label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ex: Área de Proteção Ambiental — Setor Norte"
              className="h-10 text-xs"
            />
            {errors.location && <span className="text-[11px] text-red-600">{errors.location}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.municipality')}
              </label>
              <Input
                value={formData.municipality}
                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                placeholder="Ex: Rio Claro"
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.state')}
              </label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Ex: PA"
                className="h-10 text-xs uppercase"
                maxLength={2}
              />
            </div>
          </div>

          {/* Coordenadas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.latitude')}
              </label>
              <Input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="Ex: -8.0015"
                className="h-10 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.longitude')}
              </label>
              <Input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="Ex: -34.0042"
                className="h-10 text-xs font-mono"
              />
            </div>
          </div>

          {/* Tipo e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                {t('inspections.occurrence_type')} *
              </label>
              <Select
                value={formData.occurrence_type}
                onValueChange={(val) => setFormData({ ...formData, occurrence_type: val })}
              >
                <SelectTrigger className="h-10 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Desmatamento">Desmatamento</SelectItem>
                  <SelectItem value="Queimada">Queimada</SelectItem>
                  <SelectItem value="Mineração irregular">Mineração irregular</SelectItem>
                  <SelectItem value="Ocupação irregular">Ocupação irregular</SelectItem>
                  <SelectItem value="Poluição">Poluição</SelectItem>
                  <SelectItem value="Extração de madeira">Extração de madeira</SelectItem>
                  <SelectItem value="Crime contra fauna">Crime contra fauna</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#143028]">
                Status da Fiscalização *
              </label>
              <Select
                value={formData.status}
                onValueChange={(val: any) => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger className="h-10 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Em coleta">Em coleta</SelectItem>
                  <SelectItem value="Em análise">Em análise</SelectItem>
                  <SelectItem value="Com pendências">Com pendências</SelectItem>
                  <SelectItem value="Pronta para relatório">Pronta para relatório</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Descrição inicial */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#143028]">
              {t('inspections.description')}
            </label>
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o contexto inicial da fiscalização, motivação do deslocamento..."
              className="text-xs"
            />
          </div>

          {/* Observações */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#143028]">{t('inspections.notes')}</label>
            <Textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Instruções para a equipe de campo, observações logísticas..."
              className="text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E2E8E4] flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/inspections')}
              className="h-10 px-4 text-xs"
            >
              {t('inspections.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 px-5 rounded-lg shadow-xs"
            >
              <Save className="w-4 h-4 mr-1.5" />
              <span>{isEditing ? t('inspections.save') : t('inspections.create')}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default InspectionForm
