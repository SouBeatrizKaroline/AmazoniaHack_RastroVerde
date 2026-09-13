import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  Camera,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  X,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EvidenceCard } from '@/components/EvidenceCard'
import { EvidenceModal } from '@/components/EvidenceModal'
import {
  getAllEvidence,
  getInspections,
  createEvidence,
  updateEvidence,
  deleteEvidence,
  getEvidenceFileUrl,
  type EvidenceRecord,
} from '@/services/dataService'
import { ExternalLink } from 'lucide-react'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export const EvidenceCenter: React.FC = () => {
  const { t } = useI18n()
  const { toast } = useToast()
  const [searchParams] = useSearchParams()
  const sourceEvidenceParam = searchParams.get('source')

  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>([])
  const [defaultInspectionId, setDefaultInspectionId] = useState<string>('9ykaitbzexx3fy5')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEvidence, setEditingEvidence] = useState<EvidenceRecord | null>(null)
  const [detailModalEvidence, setDetailModalEvidence] = useState<EvidenceRecord | null>(null)

  useRealtime('evidence', () => {
    loadData()
  })

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    setLoadError(null)

    const timeoutPromise = new Promise<'TIMEOUT'>((resolve) => {
      setTimeout(() => resolve('TIMEOUT'), 8000)
    })

    const fetchPromise = (async () => {
      const [allInsp, list] = await Promise.all([
        getInspections().catch((e) => {
          console.warn('EvidenceCenter getInspections error:', e)
          return [] as any[]
        }),
        getAllEvidence().catch((e) => {
          console.warn('EvidenceCenter getAllEvidence error:', e)
          return [] as EvidenceRecord[]
        }),
      ])
      const demoInsp = allInsp.find((i) => i.id_number === 'RV-DEMO-001') || allInsp[0]
      if (demoInsp) {
        setDefaultInspectionId(demoInsp.id)
      }
      setEvidenceList(list)

      // If source param is provided, open detail automatically
      if (sourceEvidenceParam) {
        const target = list.find(
          (e) =>
            e.code.toLowerCase() === sourceEvidenceParam.toLowerCase() ||
            e.id === sourceEvidenceParam,
        )
        if (target) {
          setDetailModalEvidence(target)
        }
      }
      return true
    })()

    try {
      const race = await Promise.race([fetchPromise, timeoutPromise])
      if (race === 'TIMEOUT') {
        console.warn('EvidenceCenter timed out after 8s')
        setLoadError('Tempo limite excedido ao carregar evidências.')
      }
    } catch (err: any) {
      console.error('EvidenceCenter loadData error:', err)
      setLoadError(err?.message || 'Falha ao carregar evidências.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [sourceEvidenceParam])

  // Also react when evidenceList changes if source param exists, or when custom tour event fires
  useEffect(() => {
    if (sourceEvidenceParam) {
      if (evidenceList.length > 0) {
        const target = evidenceList.find(
          (e) =>
            e.code.toLowerCase() === sourceEvidenceParam.toLowerCase() ||
            e.id === sourceEvidenceParam,
        )
        if (target) {
          setDetailModalEvidence(target)
        }
      } else {
        getAllEvidence()
          .then((all) => {
            const target = all.find(
              (e) =>
                e.code.toLowerCase() === sourceEvidenceParam.toLowerCase() ||
                e.id === sourceEvidenceParam,
            )
            if (target) {
              setDetailModalEvidence(target)
            }
          })
          .catch(() => {})
      }
    }

    const handleTourOpenEvidence = (evt: Event) => {
      const customEvt = evt as CustomEvent<{ code: string }>
      const code = customEvt.detail?.code
      if (code) {
        // Try finding in current evidenceList, or load if list is still empty
        if (evidenceList.length > 0) {
          const found = evidenceList.find(
            (e) => e.code.toLowerCase() === code.toLowerCase() || e.id === code,
          )
          if (found) {
            setDetailModalEvidence(found)
          }
        } else {
          getAllEvidence()
            .then((all) => {
              const found = all.find(
                (e) => e.code.toLowerCase() === code.toLowerCase() || e.id === code,
              )
              if (found) {
                setDetailModalEvidence(found)
              }
            })
            .catch(() => {})
        }
      }
    }

    window.addEventListener('tour-open-evidence', handleTourOpenEvidence)
    return () => {
      window.removeEventListener('tour-open-evidence', handleTourOpenEvidence)
    }
  }, [sourceEvidenceParam, evidenceList])

  const types = [
    { key: 'ALL', label: t('evidence.all_types') },
    { key: 'Fotografia', label: 'Fotografia' },
    { key: 'Vídeo', label: 'Vídeo' },
    { key: 'Áudio', label: 'Áudio' },
    { key: 'Documento', label: 'Documento' },
    { key: 'Anotação', label: 'Anotação' },
    { key: 'Localização', label: 'Localização' },
    { key: 'Depoimento', label: 'Depoimento' },
  ]

  const filtered = evidenceList.filter((evd) => {
    const matchesType = selectedType === 'ALL' || evd.type === selectedType
    const term = search.toLowerCase()
    const matchesSearch =
      evd.code.toLowerCase().includes(term) ||
      evd.description.toLowerCase().includes(term) ||
      evd.officer?.toLowerCase().includes(term) ||
      evd.tags?.toLowerCase().includes(term) ||
      evd.notes?.toLowerCase().includes(term)
    return matchesType && matchesSearch
  })

  const handleSave = async (data: FormData | Partial<EvidenceRecord>) => {
    try {
      if (editingEvidence) {
        if (data instanceof FormData) {
          if (!data.get('inspection')) {
            data.set('inspection', editingEvidence.inspection || defaultInspectionId)
          }
        }
        await updateEvidence(editingEvidence.id, data)
        toast({ title: t('evidence.update_success') })
      } else {
        if (data instanceof FormData) {
          if (!data.get('inspection')) {
            data.set('inspection', defaultInspectionId)
          }
          if (!data.get('code')) {
            data.set('code', `EVD-${Math.floor(100 + Math.random() * 900)}`)
          }
          await createEvidence(data)
        } else {
          const payload = {
            ...data,
            inspection: data.inspection || defaultInspectionId,
            code: data.code || `EVD-${Math.floor(100 + Math.random() * 900)}`,
          }
          await createEvidence(payload)
        }
        toast({ title: t('evidence.create_success') })
      }
      await loadData()
    } catch (err: any) {
      console.error(err)
      toast({
        title: 'Erro ao salvar evidência',
        description: err?.message || 'Falha na persistência da evidência.',
        variant: 'destructive',
      })
      throw err
    }
  }

  const handleDelete = async (evd: EvidenceRecord) => {
    try {
      await deleteEvidence(evd.id)
      toast({ title: t('evidence.delete_success') })
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao remover evidência.', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Traceability back-banner if arrived from report */}
      {sourceEvidenceParam && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#E7F2EC] border border-[#1B5E3A]/30 text-xs text-[#1B5E3A]">
          <div className="flex items-center gap-2 font-semibold">
            <Compass className="w-4 h-4" />
            <span>{t('evidence.source_banner')}</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#1B5E3A]/30">
              {sourceEvidenceParam}
            </span>
          </div>
          <Link to="/reports" className="text-xs font-bold underline hover:text-[#14502F]">
            {t('evidence.back_to_report')}
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">{t('evidence.title')}</h1>
          <p className="text-xs text-[#5B6B63] mt-1">
            Repositório central de registros, fotografias georreferenciadas, anotações e documentos
            comprobatórios.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingEvidence(null)
            setModalOpen(true)
          }}
          className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-9 px-4 rounded-lg shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{t('evidence.add')}</span>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border border-[#E2E8E4] bg-white shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5B6B63]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('evidence.search_placeholder')}
            className="pl-9 h-9 text-xs border-[#E2E8E4] bg-[#F7F9F8] focus-visible:ring-[#1B5E3A]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {types.map((type) => (
            <button
              key={type.key}
              onClick={() => setSelectedType(type.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedType === type.key
                  ? 'bg-[#1B5E3A] text-white shadow-xs'
                  : 'bg-[#F7F9F8] text-[#5B6B63] hover:text-[#143028] hover:bg-[#E2E8E4]/50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((evd) => (
          <EvidenceCard
            key={evd.id}
            evidence={evd}
            isHighlighted={sourceEvidenceParam === evd.code}
            onSelect={(item) => setDetailModalEvidence(item)}
            onEdit={(item) => {
              setEditingEvidence(item)
              setModalOpen(true)
            }}
            onDelete={handleDelete}
          />
        ))}

        {loading && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 space-y-3">
            <div className="w-8 h-8 border-3 border-[#1B5E3A] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[#5B6B63] font-semibold">{t('workspace.loading')}</span>
          </div>
        )}

        {!loading && loadError && (
          <div className="col-span-full p-8 text-center rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3">
            <p className="text-xs text-amber-900 font-medium">{loadError}</p>
            <Button
              size="sm"
              onClick={() => loadData()}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs"
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {!loading && !loadError && filtered.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-[#E2E8E4] bg-white">
            <p className="text-sm font-medium text-[#5B6B63]">{t('evidence.empty')}</p>
          </div>
        )}
      </div>

      {/* Modal for Add / Edit */}
      <EvidenceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        inspectionId={defaultInspectionId}
        evidenceToEdit={editingEvidence}
        onSave={handleSave}
      />

      {/* Modal for Full Evidence Detail */}
      <Dialog
        open={!!detailModalEvidence}
        onOpenChange={(open) => !open && setDetailModalEvidence(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {detailModalEvidence && (
            <div className="space-y-4">
              <DialogHeader>
                <div className="flex items-center justify-between gap-2 border-b border-[#E2E8E4] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2.5 py-1 rounded-md">
                      {detailModalEvidence.code}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F7F9F8] border border-[#E2E8E4]">
                      {detailModalEvidence.type}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {detailModalEvidence.status}
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-base font-bold text-[#143028] pt-2 text-left">
                  {detailModalEvidence.description}
                </DialogTitle>
              </DialogHeader>

              {/* File Display / Preview */}
              {detailModalEvidence.file ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#E2E8E4] bg-black/5 p-3 flex flex-col items-center justify-center">
                  {detailModalEvidence.file.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
                    <div className="space-y-2 text-center w-full">
                      <img
                        src={getEvidenceFileUrl(detailModalEvidence) || ''}
                        alt={`Evidência fotográfica ${detailModalEvidence.code}: ${detailModalEvidence.description || 'Registro de campo'}`}
                        loading="lazy"
                        decoding="async"
                        className="max-h-72 w-auto mx-auto object-contain rounded-xl shadow-xs border border-[#E2E8E4]"
                      />
                      <a
                        href={getEvidenceFileUrl(detailModalEvidence) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#1B5E3A] font-semibold hover:underline"
                      >
                        <span>Abrir imagem em alta resolução</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : detailModalEvidence.file.match(/\.(mp4|webm|mov)$/i) ? (
                    <div className="w-full space-y-2">
                      <video
                        controls
                        src={getEvidenceFileUrl(detailModalEvidence) || ''}
                        className="max-h-72 w-full rounded-xl"
                      />
                      <div className="text-center text-xs font-semibold text-[#143028]">
                        {detailModalEvidence.file}
                      </div>
                    </div>
                  ) : detailModalEvidence.file.match(/\.(mp3|wav|ogg|m4a)$/i) ? (
                    <div className="w-full p-4 space-y-2 text-center">
                      <audio
                        controls
                        src={getEvidenceFileUrl(detailModalEvidence) || ''}
                        className="w-full"
                      />
                      <div className="text-xs font-semibold text-[#143028]">
                        Gravação de áudio anexada: {detailModalEvidence.file}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-3">
                      <div className="text-sm font-semibold text-[#143028]">
                        Documento probatório: {detailModalEvidence.file}
                      </div>
                      <a
                        href={getEvidenceFileUrl(detailModalEvidence) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B5E3A] text-white text-xs font-semibold hover:bg-[#14502F] shadow-xs"
                      >
                        <span>Visualizar / Baixar documento anexado</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                  <div className="mt-2 text-[11px] text-[#5B6B63] font-mono">
                    ✓ Arquivo persistido no banco com integridade probatória
                  </div>
                </div>
              ) : (
                detailModalEvidence.type === 'Fotografia' && (
                  <div className="relative h-48 rounded-xl overflow-hidden border border-[#E2E8E4] bg-gradient-to-tr from-[#1B5E3A]/20 via-[#0F766E]/20 to-[#B45309]/20 flex items-center justify-center">
                    <div className="flex flex-col items-center text-xs font-semibold text-[#1B5E3A] bg-white/90 backdrop-blur-xs px-4 py-2 rounded-xl border border-[#E2E8E4] shadow-sm">
                      <Camera className="w-5 h-5 mb-1" />
                      <span>Registro Fotográfico Original Georreferenciado</span>
                      <span className="text-[11px] text-[#5B6B63] font-mono">
                        {detailModalEvidence.code} • Latitude {detailModalEvidence.latitude},
                        Longitude {detailModalEvidence.longitude}
                      </span>
                    </div>
                  </div>
                )
              )}

              {/* Data Table */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-xs">
                <div>
                  <span className="text-[#5B6B63]">Data e Hora:</span>
                  <div className="font-semibold text-[#143028] mt-0.5">
                    {detailModalEvidence.date} às {detailModalEvidence.time}
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B63]">Responsável pelo Registro:</span>
                  <div className="font-semibold text-[#143028] mt-0.5">
                    {detailModalEvidence.officer || (
                      <span className="text-[#B3261E] italic">Não informado</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B63]">Coordenadas Geográficas:</span>
                  <div className="font-mono font-semibold text-[#0F766E] mt-0.5">
                    {detailModalEvidence.latitude != null && detailModalEvidence.longitude != null
                      ? `${detailModalEvidence.latitude}, ${detailModalEvidence.longitude}`
                      : 'Não registradas'}
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B63]">Tags de Rastreabilidade:</span>
                  <div className="font-semibold text-[#1B5E3A] mt-0.5">
                    {detailModalEvidence.tags || 'Sem tags'}
                  </div>
                </div>
              </div>
              {detailModalEvidence.notes && (
                <div className="p-3 rounded-xl bg-white border border-[#E2E8E4] text-xs space-y-1">
                  <span className="font-bold text-[#143028]">Observações Técnicas de Campo:</span>
                  <p className="text-[#5B6B63] leading-relaxed">{detailModalEvidence.notes}</p>
                </div>
              )}

              {/* Traceability link */}
              <div className="pt-2 flex items-center justify-between border-t border-[#E2E8E4]">
                <Link
                  to="/reports"
                  className="text-xs font-semibold text-[#1B5E3A] hover:underline"
                >
                  ← {t('evidence.back_to_report')}
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDetailModalEvidence(null)}
                  className="text-xs"
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default EvidenceCenter
