/**
 * Tipos e Modelos Centrais de Elaboração da Minuta e Rastreabilidade Probatória
 * Alinhado ao Desafio 1 do AmazôniaHack 4.0 (RastroVerde)
 *
 * Regras:
 * - O sistema nunca inventa fatos, nomes, coordenadas, autos ou números.
 * - Divergências não são decididas silenciosamente; mostram "Divergência encontrada".
 * - Sem evidência: "Informação não localizada nas evidências fornecidas." ou "Evidência insuficiente para sustentar esta afirmação."
 * - Custos/processamento: "Ainda não medido."
 */

export type ConfidenceLevel = 'Alta' | 'Média' | 'Baixa'
export type FactStatus = 'Confirmado' | 'Divergência' | 'Pendente' | 'Requer revisão' | 'Ausente'
export type VerificationCategory =
  | 'Confirmado'
  | 'Divergência'
  | 'Ausente'
  | 'Baixa confiança'
  | 'Requer revisão humana'

export interface EvidenceReference {
  evidenceCode: string // Ex: audio_campo_03.mp3, foto_07.jpg, field-notes.md, doc_termo_01.pdf
  evidenceType:
    | 'Fotografia'
    | 'Vídeo'
    | 'Áudio'
    | 'Documento'
    | 'Anotação'
    | 'Localização'
    | 'Depoimento'
  locationWithinEvidence: string // Ex: "01:24", "Exif GPS -8.0015, -34.0042", "Linha 14 / Parágrafo 2", "Página 1, Cláusula 3"
  derivedSnippet?: string // Trecho exato da transcrição ou citação
  confidence: ConfidenceLevel
  capturedAt?: string
  recordedBy?: string
  fileIntegrityIndicator?: string // Indicador de integridade do arquivo (hash sha256 simplificado)
}

export interface ExtractedFact {
  id: string
  category: 'Identificação' | 'Ocorrência' | 'Geografia' | 'Infração' | 'Instrumentos'
  fieldKey: string
  label: string
  value: string
  formattedValue?: string
  references: EvidenceReference[]
  confidence: ConfidenceLevel
  status: FactStatus
  notes?: string
  divergenceId?: string
}

export interface DivergenceItem {
  id: string
  field: string
  fieldLabel: string
  sourceA: {
    source: string
    type: string
    value: string
    location: string
  }
  sourceB: {
    source: string
    type: string
    value: string
    location: string
  }
  status: 'requer validação humana' | 'resolvido'
  selectedSource?: 'sourceA' | 'sourceB' | 'custom'
  selectedExplanation?: string
  selectedBy?: string
}

export interface MissingInformationItem {
  id: string
  title: string
  description: string
  category: 'crítico' | 'importante' | 'recomendado'
  impactOnReport: string
  fieldGuidance: string // Orientação de coleta em campo
  resolved: boolean
}

export interface FieldNoteItem {
  id: string
  code: string
  timestamp: string
  author: string
  originalText: string // Preserva grafia e erros de digitação originais de campo
  structuredInterpretation: string // Extração estruturada gerada para apoio
}

export interface AudioEvidenceItem {
  id: string
  code: string
  filename: string
  duration: string // ex "03:42"
  recordedAt: string
  recordedBy: string
  transcription: string
  relevantSnippets: {
    timestamp: string
    snippet: string
    associatedFact: string
    confidence: ConfidenceLevel
  }[]
  audioUrl?: string
  fileIntegrityIndicator: string
}

export interface DocumentInstrument {
  id: string
  type:
    | 'Auto de Constatação'
    | 'Auto de Infração'
    | 'Termo de Embargo'
    | 'Relatório de Fiscalização'
  code: string
  number: string
  date: string
  parties: string
  citedPreviousInstrumentNumber?: string
  location: string
  area: string
  coordinates: string
  status: 'Lavrado' | 'Em elaboração' | 'Pendente'
  consistencyNotes?: string
}

export interface InstrumentConsistencyCheck {
  property: string
  label: string
  constatacaoValue: string
  infracaoValue: string
  embargoValue: string
  relatorioValue: string
  status: 'Consistente' | 'Divergência' | 'Ausente'
  divergenceAlert?: string
}

export interface DraftSection {
  id: number
  title: string
  subtitle?: string
  content: string
  references: EvidenceReference[]
  hasMissingInfo?: boolean
  hasDivergence?: boolean
  divergenceAlert?: string
  isCustomized?: boolean
}

export interface MunicipalityTemplate {
  id: string
  name: string
  state: string
  organName: string // Ex: SEMMA Altamira, SEMAS Paragominas
  normativeBase: string
  headerCode: string
  requiredSections: string[]
  specificFields: {
    label: string
    instruction: string
  }[]
}

export interface CostProcessingMetrics {
  method: string
  model: string
  estimatedCost: string // "Ainda não medido."
  processingTime: string // "Ainda não medido."
  processedUnits: string // "14 evidências (áudio, foto, notas, docs)"
}
