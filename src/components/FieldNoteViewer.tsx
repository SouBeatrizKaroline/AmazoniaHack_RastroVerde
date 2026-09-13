import React, { useState } from 'react'
import { FileText, Sparkles, AlertCircle, ArrowRightLeft, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { FieldNoteItem } from '@/services/draftReportTypes'

interface FieldNoteViewerProps {
  note: FieldNoteItem
}

export const FieldNoteViewer: React.FC<FieldNoteViewerProps> = ({ note }) => {
  const [viewMode, setViewMode] = useState<'both' | 'original' | 'structured'>('both')

  return (
    <div className="rounded-3xl border border-[#E2E8E4] bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8E4]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#1B5E3A] bg-[#E7F2EC] px-2 py-0.5 rounded-md">
              {note.code}
            </span>
            <span className="text-xs text-[#5B6B63]">{note.timestamp}</span>
            <span className="text-xs text-[#5B6B63]"> • {note.author}</span>
          </div>
          <h4 className="text-sm font-bold text-[#143028] mt-1">
            Caderneta de Campo (Anotação Direta do Fiscal)
          </h4>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#F7F9F8] p-1 rounded-xl border border-[#E2E8E4] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('both')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'both' ? 'bg-white text-[#143028] shadow-xs' : 'text-[#5B6B63]'
            }`}
          >
            Lado a Lado
          </button>
          <button
            type="button"
            onClick={() => setViewMode('original')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'original' ? 'bg-white text-[#143028] shadow-xs' : 'text-[#5B6B63]'
            }`}
          >
            Texto Original
          </button>
          <button
            type="button"
            onClick={() => setViewMode('structured')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'structured' ? 'bg-white text-[#143028] shadow-xs' : 'text-[#5B6B63]'
            }`}
          >
            Interpretação Estruturada
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original Text (Preserves typos and abbreviations without silent alteration) */}
        {(viewMode === 'both' || viewMode === 'original') && (
          <div
            className={`rounded-2xl border border-amber-200 bg-amber-50/40 p-4 space-y-2 ${
              viewMode === 'original' ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Texto Original Preservado (Caderneta de Campo)</span>
              </span>
              <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Grafia original intocada
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200 font-mono text-xs text-amber-950 leading-relaxed whitespace-pre-wrap">
              {note.originalText}
            </div>
            <p className="text-[11px] text-amber-800/80 leading-normal flex items-start gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Regra de integridade: o sistema não corrige silenciosamente erros de digitação ou
                termos de campo para manter a fidedignidade probatória.
              </span>
            </p>
          </div>
        )}

        {/* Structured Interpretation */}
        {(viewMode === 'both' || viewMode === 'structured') && (
          <div
            className={`rounded-2xl border border-emerald-200 bg-[#E7F2EC]/40 p-4 space-y-2 ${
              viewMode === 'structured' ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1B5E3A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#1B5E3A]" />
                <span>Interpretação Estruturada para Apoio à Minuta</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Apoio técnico
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 font-sans text-xs text-[#143028] leading-relaxed">
              {note.structuredInterpretation}
            </div>
            <p className="text-[11px] text-[#5B6B63] leading-normal">
              Extração técnica de fatos-chave mantendo vínculo de rastreabilidade com cada frase da
              caderneta original.
            </p>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-[#E2E8E4] flex items-center justify-between text-[11px] text-[#5B6B63]">
        <span className="flex items-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            Indicador de integridade: SHA256 e assinatura do agente Jhay validadas no caderno
            físico.
          </span>
        </span>
      </div>
    </div>
  )
}
export default FieldNoteViewer
