import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/lib/i18n'
import {
  FileText,
  Printer,
  Download,
  Edit3,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileCheck2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  getInspectionByNumber,
  getEvidenceByInspection,
  getActivitiesByInspection,
  type InspectionRecord,
  type EvidenceRecord,
  type ActivityRecord,
} from '@/services/dataService'
import { useToast } from '@/hooks/use-toast'

export const ReportGenerator: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [inspection, setInspection] = useState<InspectionRecord | null>(null)
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>([])
  const [activitiesList, setActivitiesList] = useState<ActivityRecord[]>([])
  const [isEditing, setIsEditing] = useState(false)

  // 13 Editable Sections Content
  const [sections, setSections] = useState({
    sec1: 'Auto de Fiscalização RV-2026-001 — Vistoria de Constatação Técnica Ambiental. Processo de Referência: SIS-AMB-2026/0912.',
    sec2: 'Realizada em 12/09/2026 às 08:30 no Setor Norte da Área de Proteção Ambiental (APA), Município de Rio Claro/PA.',
    sec3: 'Equipe Tática Ambiental Composta por: Agente 01 — Beatriz Silva (Fiscal Titular), Léo Matias Araújo e Sonia Janara S. Barros.',
    sec4: 'Operação desencadeada em decorrência de alerta de supressão de cobertura vegetal nativa gerado por satélite de monitoramento contínuo.',
    sec5: 'Constatada intervenção mecânica com supressão de vegetação primária em área estimada preliminarmente em 4 hectares, presença de marcas recentes de trator de lâmina e estocagem não autorizada de madeira protegida.',
    sec6: 'Registradas 9 evidências georreferenciadas, abrangendo registros fotográficos de clareiras, marcas de maquinário, troncos empilhados, anotações de campo e depoimento de testemunha local.',
    sec7: 'Deslocamento iniciado às 08:42; marco de entrada fixado às 09:05; fotografias às 14:32; encerramento preliminar de campo às 15:40.',
    sec8: 'Poligonal delimitada entre as coordenadas Latitude -8.0000 e -8.0040, Longitude -34.0000 e -34.0050, datum SIRGAS 2000.',
    sec9: 'Notificação formal DOC-003 emitida e entregue com assinalamento de prazo legal para apresentação do Cadastro Ambiental Rural (CAR) e título de propriedade.',
    sec10:
      'PONTOS PARA REVISÃO: Recomenda-se confirmar a coordenada descrita na anotação de campo relativa ao acampamento temporário (divergência detectada entre anotação textual e receptor GNSS) e suprir a ausência de identificação do fiscal no registro EVD-008.',
    sec11:
      'INFORMAÇÕES PENDENTES: Apresentação da comprovação dominial/CAR pelo ocupante e cálculo da poligonal vetorial definitiva da área desmatada.',
    sec12:
      'Local com topografia acidentada e solo de textura argilosa que facilitou a preservação dos rastros de esteira dos maquinários.',
    sec13:
      'Com base nas constatações técnicas e nas evidências rastreadas, sugere-se a continuidade do procedimento de apuração com intimação do suposto responsável e encaminhamento do dossiê ao órgão gestor da unidade de conservação.',
  })

  useEffect(() => {
    getInspectionByNumber('RV-DEMO-001').then(async (insp) => {
      setInspection(insp)
      const [evds, acts] = await Promise.all([
        getEvidenceByInspection(insp.id),
        getActivitiesByInspection(insp.id),
      ])
      setEvidenceList(evds)
      setActivitiesList(acts)
    })
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleExportJSON = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      inspection,
      evidenceList,
      activitiesList,
      reportSections: sections,
    }
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Relatorio-Fiscalizacao-${inspection?.id_number || 'RV-DEMO-001'}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast({ title: 'Exportação JSON concluída com sucesso!' })
  }

  const handleNavigateToSource = (code: string) => {
    navigate(`/evidence?source=${code}`)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-[#E2E8E4] bg-white shadow-xs print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A] mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('report.traceability_quote')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#143028]">{t('report.title')}</h1>
          <p className="text-xs text-[#5B6B63]">{t('report.draft_notice')}</p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-9 text-xs border-[#E2E8E4]"
          >
            <Edit3 className="w-3.5 h-3.5 mr-1.5" />
            <span>{isEditing ? t('report.view_mode') : t('report.edit_mode')}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            className="h-9 text-xs border-[#E2E8E4]"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>{t('report.export_json')}</span>
          </Button>

          <Button
            size="sm"
            onClick={handlePrint}
            className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-9 px-4 rounded-lg shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>
              {t('report.export_pdf')} / {t('report.print')}
            </span>
          </Button>
        </div>
      </div>

      {/* Official Report Document Paper (Printable) */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white p-8 sm:p-12 shadow-sm space-y-8 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
        {/* Document Institutional Header */}
        <div className="border-b-2 border-[#1B5E3A] pb-6 space-y-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E3A]">
                Governo do Estado • Órgão de Fiscalização Ambiental
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#143028] mt-0.5">
                RELATÓRIO TÉCNICO DE VISTORIA AMBIENTAL
              </h2>
            </div>
            <div className="sm:text-right font-mono text-xs font-bold text-[#143028]">
              <div>PROCESSO: RV-2026-001</div>
              <div className="text-[11px] text-[#5B6B63] font-normal">EMISSÃO PRELIMINAR</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#E7F2EC]/60 border border-[#1B5E3A]/20 text-[11px] text-[#1B5E3A] font-medium text-center">
            {t('report.draft_notice')}
          </div>
        </div>

        {/* 13 Structured Numbered Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-[#143028]">
          {/* Section 1 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">
              1. Identificação da Fiscalização
            </h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec1}
                onChange={(e) => setSections({ ...sections, sec1: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec1}</p>
            )}
          </div>

          {/* Section 2 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">2. Data e Local</h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec2}
                onChange={(e) => setSections({ ...sections, sec2: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec2}</p>
            )}
          </div>

          {/* Section 3 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">3. Equipe Responsável</h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec3}
                onChange={(e) => setSections({ ...sections, sec3: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec3}</p>
            )}
          </div>

          {/* Section 4 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">4. Contextualização</h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec4}
                onChange={(e) => setSections({ ...sections, sec4: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec4}</p>
            )}
          </div>

          {/* Section 5 — With Direct Traceability Source Block */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">
              5. Descrição da Ocorrência
            </h3>
            {isEditing ? (
              <Textarea
                rows={3}
                value={sections.sec5}
                onChange={(e) => setSections({ ...sections, sec5: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec5}</p>
            )}

            {/* Traceability Source Badge & Return Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] text-[11px] print:bg-transparent">
              <div className="flex flex-wrap items-center gap-2 text-[#5B6B63]">
                <span className="font-bold text-[#143028]">{t('report.source_block')}</span>
                <span className="font-mono font-bold text-[#1B5E3A] bg-white px-1.5 py-0.5 rounded border border-[#E2E8E4]">
                  📷 EVD-014
                </span>
                <span>📍 Lat -8.0000, Long -34.0000</span>
                <span>🕒 14:32</span>
                <span>👤 Agente 01 — Beatriz Silva</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigateToSource('EVD-014')}
                className="h-7 text-[11px] font-bold text-[#1B5E3A] hover:bg-[#E7F2EC] print:hidden self-end sm:self-center"
              >
                <span>{t('report.view_source_evidence')}</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Section 6 — Evidence Summary */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">6. Evidências Coletadas</h3>
            {isEditing ? (
              <Textarea
                rows={3}
                value={sections.sec6}
                onChange={(e) => setSections({ ...sections, sec6: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec6}</p>
            )}

            {/* Additional Traceability Source Block for EVD-015 and EVD-016 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 print:hidden">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F9F8] border border-[#E2E8E4] text-[11px]">
                <div className="font-mono text-[#1B5E3A] font-semibold">
                  📷 EVD-015 (Marcas de trator)
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigateToSource('EVD-015')}
                  className="font-bold text-[#0F766E] hover:underline"
                >
                  Ver origem →
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F9F8] border border-[#E2E8E4] text-[11px]">
                <div className="font-mono text-[#1B5E3A] font-semibold">
                  📷 EVD-016 (Madeira protegida)
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigateToSource('EVD-016')}
                  className="font-bold text-[#0F766E] hover:underline"
                >
                  Ver origem →
                </button>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">7. Linha do Tempo</h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec7}
                onChange={(e) => setSections({ ...sections, sec7: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec7}</p>
            )}
          </div>

          {/* Section 8 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">8. Dados Geográficos</h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec8}
                onChange={(e) => setSections({ ...sections, sec8: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028] font-mono text-xs">{sections.sec8}</p>
            )}
          </div>

          {/* Section 9 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">
              9. Documentos Relacionados
            </h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec9}
                onChange={(e) => setSections({ ...sections, sec9: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec9}</p>
            )}
          </div>

          {/* Section 10 */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
            <h3 className="font-bold text-[#B45309] text-sm uppercase">
              10. Pontos que Precisam de Revisão
            </h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec10}
                onChange={(e) => setSections({ ...sections, sec10: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-amber-950">{sections.sec10}</p>
            )}
          </div>

          {/* Section 11 */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
            <h3 className="font-bold text-[#2563EB] text-sm uppercase">
              11. Informações Pendentes
            </h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec11}
                onChange={(e) => setSections({ ...sections, sec11: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-blue-950">{sections.sec11}</p>
            )}
          </div>

          {/* Section 12 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">12. Observações</h3>
            {isEditing ? (
              <Textarea
                rows={2}
                value={sections.sec12}
                onChange={(e) => setSections({ ...sections, sec12: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec12}</p>
            )}
          </div>

          {/* Section 13 */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#1B5E3A] text-sm uppercase">13. Conclusão do Agente</h3>
            {isEditing ? (
              <Textarea
                rows={3}
                value={sections.sec13}
                onChange={(e) => setSections({ ...sections, sec13: e.target.value })}
                className="text-xs"
              />
            ) : (
              <p className="leading-relaxed text-[#143028]">{sections.sec13}</p>
            )}
          </div>
        </div>

        {/* Signatures block */}
        <div className="pt-10 border-t border-[#E2E8E4] grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
          <div className="space-y-1">
            <div className="w-48 mx-auto border-b border-gray-400 pb-1 font-semibold text-[#143028]">
              Beatriz Silva
            </div>
            <div className="text-[11px] text-[#5B6B63]">
              Agente Fiscal Responsável • Matrícula 9821-X
            </div>
          </div>

          <div className="space-y-1">
            <div className="w-48 mx-auto border-b border-gray-400 pb-1 font-semibold text-[#143028]">
              Coordenação Regional
            </div>
            <div className="text-[11px] text-[#5B6B63]">Visto da Autoridade Competente</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReportGenerator
