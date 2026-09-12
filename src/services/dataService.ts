import pb from '@/lib/pocketbase/client'
import type { RecordModel } from 'pocketbase'

export interface InspectionRecord extends RecordModel {
  id_number: string
  date: string
  time: string
  agent: string
  team: string
  location: string
  municipality: string
  state: string
  latitude: number
  longitude: number
  occurrence_type: string
  description: string
  notes: string
  status: 'Em coleta' | 'Em análise' | 'Com pendências' | 'Pronta para relatório' | 'Finalizada'
  is_demo: boolean
  created: string
  updated: string
}

export interface EvidenceRecord extends RecordModel {
  inspection: string
  code: string
  type: 'Fotografia' | 'Vídeo' | 'Áudio' | 'Documento' | 'Anotação' | 'Localização' | 'Depoimento'
  date: string
  time: string
  latitude?: number
  longitude?: number
  officer: string
  description: string
  tags: string
  notes: string
  file?: string
  status: 'Registrada' | 'Em revisão' | 'Verificada'
  created: string
  updated: string
}

export interface ActivityRecord extends RecordModel {
  inspection: string
  timestamp: string
  actor: string
  description: string
  linked_evidence?: string
  created: string
  updated: string
}

// Inspections service
export async function getInspections(filter?: string, sort = '-created') {
  return await pb.collection('inspections').getFullList<InspectionRecord>({
    filter,
    sort,
  })
}

export async function getInspectionById(id: string) {
  return await pb.collection('inspections').getOne<InspectionRecord>(id)
}

export async function getInspectionByNumber(idNumber: string) {
  return await pb
    .collection('inspections')
    .getFirstListItem<InspectionRecord>(`id_number = "${idNumber}"`)
}

export async function createInspection(data: Partial<InspectionRecord>) {
  return await pb.collection('inspections').create<InspectionRecord>(data)
}

export async function updateInspection(id: string, data: Partial<InspectionRecord>) {
  return await pb.collection('inspections').update<InspectionRecord>(id, data)
}

export async function deleteInspection(id: string) {
  return await pb.collection('inspections').delete(id)
}

// Evidence service
export async function getEvidenceByInspection(inspectionId: string, filter?: string) {
  const combinedFilter = filter
    ? `inspection = "${inspectionId}" && (${filter})`
    : `inspection = "${inspectionId}"`
  return await pb.collection('evidence').getFullList<EvidenceRecord>({
    filter: combinedFilter,
    sort: 'created',
  })
}

export async function getAllEvidence(filter?: string) {
  return await pb.collection('evidence').getFullList<EvidenceRecord>({
    filter,
    sort: '-created',
  })
}

export async function getEvidenceById(id: string) {
  return await pb.collection('evidence').getOne<EvidenceRecord>(id, {
    expand: 'inspection',
  })
}

export async function createEvidence(formData: FormData | Partial<EvidenceRecord>) {
  return await pb.collection('evidence').create<EvidenceRecord>(formData)
}

export async function updateEvidence(id: string, formData: FormData | Partial<EvidenceRecord>) {
  return await pb.collection('evidence').update<EvidenceRecord>(id, formData)
}

export async function deleteEvidence(id: string) {
  return await pb.collection('evidence').delete(id)
}

// Activities service
export async function getActivitiesByInspection(inspectionId: string) {
  return await pb.collection('activities').getFullList<ActivityRecord>({
    filter: `inspection = "${inspectionId}"`,
    sort: 'created',
    expand: 'linked_evidence',
  })
}

export async function createActivity(data: {
  inspection: string
  timestamp: string
  actor: string
  description: string
  linked_evidence?: string
}) {
  return await pb.collection('activities').create<ActivityRecord>(data)
}
