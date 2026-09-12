import React, { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'
import { MapPin, Camera, Layers, Filter, Compass, Info, Clock, User, X } from 'lucide-react'
import { getAllEvidence, getEvidenceFileUrl, type EvidenceRecord } from '@/services/dataService'
import { Button } from '@/components/ui/button'

export const EvidenceMap: React.FC = () => {
  const { t } = useI18n()
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>([])
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceRecord | null>(null)
  const [activeTypes, setActiveTypes] = useState<string[]>([
    'Fotografia',
    'Vídeo',
    'Áudio',
    'Documento',
    'Anotação',
    'Localização',
    'Depoimento',
  ])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    loadMapData()
  }, [])

  const loadMapData = async () => {
    setLoading(true)
    setLoadError(null)

    const timeoutPromise = new Promise<'TIMEOUT'>((resolve) => {
      setTimeout(() => resolve('TIMEOUT'), 8000)
    })

    const fetchPromise = (async () => {
      const res = await getAllEvidence().catch((err) => {
        console.warn('EvidenceMap getAllEvidence error:', err)
        return [] as EvidenceRecord[]
      })
      setEvidenceList(res)
      if (res.length > 0) {
        setSelectedEvidence(res[0])
      }
      return true
    })()

    try {
      const race = await Promise.race([fetchPromise, timeoutPromise])
      if (race === 'TIMEOUT') {
        console.warn('EvidenceMap timed out after 8s')
        setLoadError('Tempo limite excedido ao carregar mapa de evidências.')
      }
    } catch (err: any) {
      console.error('EvidenceMap loadMapData error:', err)
      setLoadError(err?.message || 'Falha ao carregar mapa.')
    } finally {
      setLoading(false)
    }
  }

  const toggleType = (type: string) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    )
  }

  const visibleEvidence = evidenceList.filter((e) => activeTypes.includes(e.type))

  // Simulated coordinate normalizer onto an 800x500 SVG canvas
  // Bounds around Rio Claro / APA: Lat ~ -8.000 to -8.005, Lon ~ -34.000 to -34.006
  const getCoordinatesPosition = (lat?: number, lon?: number) => {
    if (lat == null || lon == null) return { x: 400, y: 250 }
    const minLat = -8.005
    const maxLat = -7.999
    const minLon = -34.006
    const maxLon = -33.999

    const normX = (lon - minLon) / (maxLon - minLon)
    const normY = (lat - minLat) / (maxLat - minLat)

    // Canvas size 800x480 with 60px padding
    const x = Math.max(60, Math.min(740, 60 + normX * 680))
    const y = Math.max(60, Math.min(420, 420 - normY * 360))
    return { x, y }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A] mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('map.demo_notice')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">{t('map.title')}</h1>
          <p className="text-xs text-[#5B6B63] mt-1">{t('map.subtitle')}</p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <Info className="w-3.5 h-3.5" />
          <span>Poligonal de Fiscalização: APA Setor Norte</span>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl border border-[#E2E8E4] bg-white shadow-xs">
        <span className="text-xs font-bold text-[#5B6B63] mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtro de Camadas:</span>
        </span>
        {['Fotografia', 'Documento', 'Anotação', 'Localização', 'Depoimento'].map((type) => {
          const isActive = activeTypes.includes(type)
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#1B5E3A] text-white shadow-xs'
                  : 'bg-[#F7F9F8] text-[#5B6B63] border border-[#E2E8E4] opacity-60'
              }`}
            >
              {type}
            </button>
          )
        })}
      </div>

      {/* Loading state for Map */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-16 space-y-3 min-h-[400px]">
          <div className="w-8 h-8 border-3 border-[#1B5E3A] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#5B6B63] font-semibold">{t('workspace.loading')}</span>
        </div>
      )}

      {!loading && loadError && (
        <div className="p-8 text-center rounded-3xl border border-amber-200 bg-amber-50/50 space-y-3">
          <p className="text-xs text-amber-900 font-medium">{loadError}</p>
          <Button
            size="sm"
            onClick={() => loadMapData()}
            className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs"
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Canvas / Map Area */}
      {!loading && !loadError && (
        <div className="relative rounded-3xl border border-[#E2E8E4] bg-[#F7F9F8] overflow-hidden shadow-xs min-h-[500px]">
          {/* Topographic Lines SVG Background */}
          <svg
            viewBox="0 0 800 480"
            className="w-full h-[500px] select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle Topographical Elevation Contours */}
            <g stroke="#1B5E3A" strokeWidth="0.8" opacity="0.12" fill="none">
              <path d="M 0 100 Q 200 40, 400 120 T 800 90" />
              <path d="M 0 160 Q 250 80, 500 180 T 800 150" />
              <path d="M 0 240 Q 180 180, 380 250 T 800 220" />
              <path d="M 0 320 Q 300 260, 550 330 T 800 300" />
              <path d="M 0 400 Q 220 340, 450 420 T 800 380" />
              <ellipse cx="380" cy="220" rx="140" ry="70" />
              <ellipse cx="400" cy="210" rx="90" ry="45" />
              <ellipse cx="410" cy="200" rx="40" ry="20" />
            </g>

            {/* Grid lines */}
            <g stroke="#E2E8E4" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.7">
              <line x1="100" y1="0" x2="100" y2="480" />
              <line x1="250" y1="0" x2="250" y2="480" />
              <line x1="400" y1="0" x2="400" y2="480" />
              <line x1="550" y1="0" x2="550" y2="480" />
              <line x1="700" y1="0" x2="700" y2="480" />
              <line x1="0" y1="80" x2="800" y2="80" />
              <line x1="0" y1="180" x2="800" y2="180" />
              <line x1="0" y1="280" x2="800" y2="280" />
              <line x1="0" y1="380" x2="800" y2="380" />
            </g>

            {/* Coordinate grid labels */}
            <g fill="#5B6B63" fontSize="9" fontFamily="monospace" opacity="0.8">
              <text x="105" y="465">
                -34.0050°
              </text>
              <text x="255" y="465">
                -34.0040°
              </text>
              <text x="405" y="465">
                -34.0030°
              </text>
              <text x="555" y="465">
                -34.0020°
              </text>
              <text x="705" y="465">
                -34.0010°
              </text>

              <text x="10" y="85">
                -8.0010°
              </text>
              <text x="10" y="185">
                -8.0020°
              </text>
              <text x="10" y="285">
                -8.0030°
              </text>
              <text x="10" y="385">
                -8.0040°
              </text>
            </g>

            {/* Simulated Polygonal Boundary line of the protected reserve */}
            <polygon
              points="180,90 620,110 700,340 380,420 160,330"
              fill="#1B5E3A"
              fillOpacity="0.05"
              stroke="#1B5E3A"
              strokeWidth="1.5"
              strokeDasharray="6,4"
            />

            {/* River / Igarapé trail */}
            <path
              d="M 60 40 Q 220 180, 450 210 T 780 430"
              fill="none"
              stroke="#0F766E"
              strokeWidth="2.5"
              opacity="0.4"
            />
            <text x="250" y="170" fill="#0F766E" fontSize="9" fontWeight="bold" opacity="0.7">
              Igarapé Cristalino (Margem Protegida)
            </text>

            {/* Markers */}
            {visibleEvidence.map((evd, idx) => {
              const pos = getCoordinatesPosition(evd.latitude, evd.longitude)
              const isSelected = selectedEvidence?.id === evd.id

              return (
                <g
                  key={evd.id}
                  onClick={() => setSelectedEvidence(evd)}
                  className="cursor-pointer transition-transform"
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                >
                  {/* Soft pulse animation ring on selected or review */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      fill="#1B5E3A"
                      fillOpacity="0.2"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Pin Base */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? '12' : '9'}
                    fill={isSelected ? '#1B5E3A' : '#0F766E'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="shadow-md transition-all hover:scale-125"
                  />

                  {/* Marker code label tag */}
                  <rect
                    x={pos.x - 22}
                    y={pos.y - 24}
                    width="44"
                    height="14"
                    rx="4"
                    fill="#143028"
                    fillOpacity="0.85"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 14}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="8"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {evd.code}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Selected Evidence Popover Card */}
          {selectedEvidence && (
            <div className="absolute bottom-4 right-4 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#E2E8E4] p-4 shadow-xl animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8E4]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded">
                    {selectedEvidence.code}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                    {selectedEvidence.type}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvidence(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail / Real File */}
              {selectedEvidence.file ? (
                <div className="mt-2.5 h-28 rounded-xl overflow-hidden border border-[#E2E8E4] bg-black/5 flex items-center justify-center">
                  {selectedEvidence.file.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
                    <img
                      src={
                        getEvidenceFileUrl(selectedEvidence, '300x200') ||
                        getEvidenceFileUrl(selectedEvidence) ||
                        ''
                      }
                      alt={selectedEvidence.code}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="p-3 text-center">
                      <span className="text-[11px] font-semibold text-[#1B5E3A] block truncate max-w-[200px]">
                        📄 {selectedEvidence.file}
                      </span>
                      <a
                        href={getEvidenceFileUrl(selectedEvidence) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#0F766E] underline font-bold mt-1 inline-block"
                      >
                        Acessar anexo
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                selectedEvidence.type === 'Fotografia' && (
                  <div className="mt-2.5 h-20 rounded-lg bg-gradient-to-tr from-[#1B5E3A]/20 to-[#0F766E]/20 border border-[#E2E8E4] flex items-center justify-center">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A]">
                      <Camera className="w-4 h-4" />
                      <span>Fotografia Georreferenciada</span>
                    </div>
                  </div>
                )
              )}

              <p className="mt-2 text-xs font-medium text-[#143028] line-clamp-2">
                {selectedEvidence.description}
              </p>

              <div className="mt-2.5 pt-2 border-t border-[#E2E8E4] text-[11px] space-y-1 text-[#5B6B63]">
                <div className="flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{selectedEvidence.time}</span>
                  </span>
                  <span className="text-[#0F766E] font-semibold">
                    {selectedEvidence.latitude}, {selectedEvidence.longitude}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#143028]">
                  <User className="w-3 h-3 text-[#5B6B63]" />
                  <span className="truncate">
                    {selectedEvidence.officer || 'Responsável não identificado'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Discreet Notice */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E2E8E4] text-[11px] text-[#5B6B63] font-medium shadow-xs">
            📍 {t('map.demo_notice')} (Grid georreferenciado simulado)
          </div>
        </div>
      )}
    </div>
  )
}
export default EvidenceMap
