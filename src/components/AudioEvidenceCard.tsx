import React, { useState } from 'react'
import {
  Play,
  Pause,
  Volume2,
  ShieldCheck,
  Clock,
  FileText,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { AudioEvidenceItem } from '@/services/draftReportTypes'

interface AudioEvidenceCardProps {
  audio: AudioEvidenceItem
  onSnippetClick?: (snippet: any) => void
}

export const AudioEvidenceCard: React.FC<AudioEvidenceCardProps> = ({ audio, onSnippetClick }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSnippetIndex, setActiveSnippetIndex] = useState<number | null>(0)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="rounded-3xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8E4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E7F2EC] text-[#1B5E3A] flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md">
                {audio.code}
              </span>
              <span className="text-xs text-[#5B6B63] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {audio.duration}
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#143028] mt-0.5">{audio.filename}</h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar áudio de campo' : 'Reproduzir gravação de campo'}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-bold flex items-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-[#1B5E3A]/40 transition-all ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                : 'bg-[#1B5E3A] hover:bg-[#14502F] text-white shadow-xs'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausar áudio</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Reproduzir gravação de campo</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Simulated Audio Player Waveform com destaque para o trecho 01:24 */}
      <div className="p-3.5 rounded-2xl bg-[#F7F9F8] border border-[#E2E8E4] space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#5B6B63] font-mono">
          <span className="font-bold text-[#143028]">{isPlaying ? '01:24' : '00:00'}</span>
          <span className="text-amber-900 bg-amber-100/90 border border-amber-300 font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            Trecho crítico em destaque: 01:24 (Área 12,4 ha — única menção)
          </span>
          <span>{audio.duration}</span>
        </div>
        <div className="h-7 flex items-center gap-1 cursor-pointer">
          {[
            35, 60, 45, 80, 20, 90, 70, 50, 40, 85, 100, 75, 60, 95, 40, 30, 85, 90, 100, 65, 45,
            70, 80, 40, 30, 60, 85, 50, 70, 90, 45, 60, 35, 50, 65, 40, 30, 20, 15,
          ].map((height, i) => {
            const isHighlight = i >= 18 && i <= 24
            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all ${
                  isHighlight
                    ? 'bg-[#0F766E]'
                    : isPlaying && i < 20
                      ? 'bg-[#1B5E3A]'
                      : 'bg-[#E2E8E4]'
                }`}
                style={{ height: `${height}%` }}
              />
            )
          })}
        </div>
      </div>

      {/* Full Transcription */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-[#143028] flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#1B5E3A]" />
          <span>Transcrição integral da gravação (Voz do agente em campo):</span>
        </span>
        <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8E4] text-xs text-[#143028] leading-relaxed font-sans">
          {audio.transcription}
        </div>
      </div>

      {/* Relevant Snippets */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#5B6B63] uppercase tracking-wider">
          Trechos Relevantes Associados a Fatos da Minuta:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {audio.relevantSnippets.map((snp, idx) => {
            const isCriticalPoint = snp.timestamp === '01:24'
            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveSnippetIndex(idx)
                    onSnippetClick?.(snp)
                  }
                }}
                onClick={() => {
                  setActiveSnippetIndex(idx)
                  onSnippetClick?.(snp)
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer text-xs space-y-1.5 min-h-[44px] focus:outline-hidden focus:ring-2 focus:ring-[#1B5E3A]/40 ${
                  activeSnippetIndex === idx
                    ? 'border-[#0F766E] bg-teal-50/60 shadow-xs ring-2 ring-[#0F766E]'
                    : isCriticalPoint
                      ? 'border-amber-400 bg-amber-50/60 hover:bg-amber-50 ring-1 ring-amber-300'
                      : 'border-[#E2E8E4] bg-[#F9FCFA] hover:bg-white hover:border-[#1B5E3A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                      isCriticalPoint
                        ? 'bg-amber-200 text-amber-950 border-amber-300'
                        : 'text-[#0F766E] bg-white border-teal-200'
                    }`}
                  >
                    {snp.timestamp}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-full">
                    Confiança {snp.confidence}
                  </span>
                </div>
                <div className="font-bold text-[#143028] text-xs flex items-center gap-1">
                  {isCriticalPoint && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 animate-ping" />
                  )}
                  <span>{snp.associatedFact}</span>
                </div>
                <p className="text-[11px] text-[#5B6B63] italic line-clamp-2">{snp.snippet}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* File Integrity Indicator */}
      <div className="pt-2 border-t border-[#E2E8E4] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5B6B63]">
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold text-[#143028]">Indicador de integridade do arquivo:</span>
          <span className="truncate max-w-[280px] sm:max-w-[450px]">
            {audio.fileIntegrityIndicator}
          </span>
        </div>
        <span className="text-[10px] text-[#5B6B63]/80 italic">
          (Assegura que o arquivo não sofreu adulteração digital)
        </span>
      </div>
    </div>
  )
}
export default AudioEvidenceCard
