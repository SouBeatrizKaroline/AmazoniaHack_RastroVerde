import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'pt' | 'en'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

export const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Brand & header
    'brand.name': 'RastroVerde',
    'brand.tagline':
      'Da evidência de campo ao relatório ambiental, com rastreabilidade e confiança.',
    'badge.demo': 'Dados demonstrativos',
    'badge.fictional_demo': 'Caso demonstrativo fictício',
    'footer.text': 'RastroVerde — Tecnologia para apoiar a fiscalização ambiental.',
    'footer.rights': '',

    // Navigation
    'nav.overview': 'Visão Geral',
    'nav.inspections': 'Fiscalizações',
    'nav.new_inspection': 'Nova Fiscalização',
    'nav.evidence': 'Evidências',
    'nav.map': 'Mapa',
    'nav.verification': 'Verificação',
    'nav.gaps': 'Pendências',
    'nav.connections': 'Conexões',
    'nav.assistant': 'Assistente',
    'nav.reports': 'Relatórios',
    'nav.history': 'Histórico',
    'nav.about': 'Sobre',
    'nav.logout': 'Sair',
    'nav.login': 'Entrar',
    'nav.signup': 'Criar conta',
    'nav.home': 'Início',
    'nav.quick_new': 'Criar novo',
    'nav.quick_new_insp': 'Nova Fiscalização',
    'nav.quick_new_evd': 'Nova Evidência',

    // Landing
    'landing.headline': 'Da evidência de campo ao relatório ambiental.',
    'landing.subheadline':
      'Organize registros, conecte evidências e identifique informações faltantes antes da elaboração do relatório de fiscalização.',
    'landing.start_inspection': 'Iniciar fiscalização',
    'landing.view_demo': 'Ver demonstração',
    'landing.flow_field': 'Campo',
    'landing.flow_evidence': 'Evidências',
    'landing.flow_verification': 'Verificação',
    'landing.flow_gaps': 'Lacunas',
    'landing.flow_report': 'Relatório',
    'landing.problem_title': 'O problema na fiscalização de campo',
    'landing.problem_desc':
      'Durante operações ambientais, informações vitais ficam dispersas entre diversos suportes físicos e digitais.',
    'landing.problem_sources':
      'Fotografias, anotações de campo, coordenadas geográficas, documentos físicos, depoimentos informais, autos de infração e observações dispersas.',
    'landing.problem_risks_title': 'Riscos da organização manual',
    'landing.risk_forgotten': 'Informações e detalhes de campo esquecidos',
    'landing.risk_context': 'Evidências sem contexto ou georreferenciamento claro',
    'landing.risk_inconsistencies': 'Inconsistências de horários e coordenadas',
    'landing.risk_duplications': 'Duplicidade de registros e dados ambíguos',
    'landing.risk_gaps': 'Lacunas cruciais identificadas apenas na fase final',
    'landing.proposal_title': 'Nossa proposta',
    'landing.proposal_desc':
      'O RastroVerde cria uma trilha organizada entre cada evidência coletada e o relatório final.',
    'landing.demo_card_title': 'Experimente a fiscalização modelo RV-DEMO-001',
    'landing.demo_card_desc':
      'Navegue pelo caso de demonstração com evidências reais de campo, testes de consistência automáticos e relatório rastreável.',
    'landing.open_demo': 'Explorar demonstração completa',

    // Dashboard
    'dashboard.title': 'Visão Geral da Fiscalização',
    'dashboard.stat_inspections': 'Fiscalizações',
    'dashboard.stat_in_progress': 'Em andamento',
    'dashboard.stat_evidence': 'Evidências',
    'dashboard.stat_gaps': 'Pendências',
    'dashboard.recent_inspections': 'Fiscalizações Recentes',
    'dashboard.open_inspection': 'Abrir fiscalização',
    'dashboard.pipeline_title': 'Trilha de Fiscalização e Rastreabilidade',

    // Statuses
    'status.em_coleta': 'Em coleta',
    'status.em_analise': 'Em análise',
    'status.com_pendencias': 'Com pendências',
    'status.pronta_relatorio': 'Pronta para relatório',
    'status.finalizada': 'Finalizada',

    // Evidence types
    'evd_type.fotografia': 'Fotografia',
    'evd_type.video': 'Vídeo',
    'evd_type.audio': 'Áudio',
    'evd_type.documento': 'Documento',
    'evd_type.anotacao': 'Anotação',
    'evd_type.localizacao': 'Localização',
    'evd_type.depoimento': 'Depoimento',

    // Occurrence types
    'occ.desmatamento': 'Desmatamento',
    'occ.queimada': 'Queimada',
    'occ.mineracao': 'Mineração irregular',
    'occ.ocupacao': 'Ocupação irregular',
    'occ.poluicao': 'Poluição',
    'occ.extracao_madeira': 'Extração de madeira',
    'occ.crime_fauna': 'Crime contra fauna',
    'occ.outro': 'Outro',

    // Inspections list & form
    'inspections.title': 'Fiscalizações Ambientais',
    'inspections.new': 'Nova Fiscalização',
    'inspections.search_placeholder': 'Buscar fiscalizações por número, local, agente...',
    'inspections.all_status': 'Todos os status',
    'inspections.empty': 'Nenhuma fiscalização encontrada.',
    'inspections.edit': 'Editar',
    'inspections.details': 'Ver detalhes',
    'inspections.id_number': 'Número / Identificador',
    'inspections.date': 'Data',
    'inspections.time': 'Hora',
    'inspections.agent': 'Agente responsável',
    'inspections.team': 'Equipe de campo',
    'inspections.location': 'Local da ocorrência',
    'inspections.municipality': 'Município',
    'inspections.state': 'Estado (UF)',
    'inspections.latitude': 'Latitude',
    'inspections.longitude': 'Longitude',
    'inspections.occurrence_type': 'Tipo de ocorrência',
    'inspections.description': 'Descrição inicial',
    'inspections.notes': 'Observações adicionais',
    'inspections.save': 'Salvar alterações',
    'inspections.create': 'Criar fiscalização',
    'inspections.cancel': 'Cancelar',
    'inspections.created_success': 'Fiscalização cadastrada com sucesso!',
    'inspections.updated_success': 'Fiscalização atualizada com sucesso!',

    // Workspace / Detail
    'workspace.tabs.overview': 'Visão geral',
    'workspace.tabs.evidence': 'Evidências',
    'workspace.tabs.timeline': 'Linha do tempo',
    'workspace.tabs.verification': 'Verificação',
    'workspace.tabs.gaps': 'Lacunas',
    'workspace.tabs.report': 'Relatório',
    'workspace.completeness_title': 'Completude da fiscalização',
    'workspace.completeness_advice': 'Antes de finalizar, revise os itens pendentes.',
    'workspace.generate_report': 'Gerar Relatório',
    'workspace.edit_inspection': 'Editar dados',

    // Evidence center
    'evidence.title': 'Central de Evidências',
    'evidence.add': 'Adicionar evidência',
    'evidence.search_placeholder': 'Buscar evidências, documentos ou registros...',
    'evidence.all_types': 'Todos os tipos',
    'evidence.filter_by_type': 'Tipo de evidência',
    'evidence.code': 'Código identificador',
    'evidence.officer': 'Responsável pelo registro',
    'evidence.coordinates': 'Coordenadas (Lat / Long)',
    'evidence.tags': 'Tags (separadas por vírgula)',
    'evidence.notes': 'Observações técnicas',
    'evidence.file_upload': 'Arquivo / Mídia anexada',
    'evidence.status': 'Status da evidência',
    'evidence.empty': 'Nenhuma evidência registrada para os filtros selecionados.',
    'evidence.view_detail': 'Ver detalhes',
    'evidence.edit': 'Editar',
    'evidence.remove': 'Remover',
    'evidence.confirm_delete_title': 'Remover evidência?',
    'evidence.confirm_delete_desc':
      'Tem certeza de que deseja remover esta evidência? Esta ação será registrada no histórico de auditoria.',
    'evidence.delete_success': 'Evidência removida com sucesso.',
    'evidence.create_success': 'Evidência adicionada com sucesso!',
    'evidence.update_success': 'Evidência atualizada com sucesso!',
    'evidence.source_banner':
      'Evidência de origem selecionada a partir do Relatório de Fiscalização.',
    'evidence.back_to_report': 'Voltar ao relatório',

    // Verification
    'verification.title': 'Verificação de Consistência',
    'verification.subtitle': 'Varredura automática e cruzamento de registros com postura de apoio.',
    'verification.rerun': 'Reexecutar verificação',
    'verification.consistent': 'Consistente',
    'verification.review': 'Verificar',
    'verification.conflict': 'Conflito',
    'verification.missing': 'Informação ausente',
    'verification.cautious_notice':
      'O sistema nunca afirma existência de infração ou culpabilidade. As análises são sugestões para apoiar o agente.',
    'verification.go_to_evidence': 'Ver evidência relacionada',

    // Gaps
    'gaps.title': 'O que ainda falta?',
    'gaps.subtitle':
      'Checklist inteligente de integridade da fiscalização para subsidiar a emissão do relatório.',
    'gaps.completed': 'Concluído',
    'gaps.pending_review': 'Pendente de revisão',
    'gaps.missing_item': 'Ausente / Requer ação',
    'gaps.action_add': 'Adicionar',

    // Report
    'report.title': 'Gerador de Relatório de Infração',
    'report.draft_notice':
      'Rascunho gerado com base nas informações cadastradas. Revise antes da emissão.',
    'report.view_mode': 'Visualizar relatório',
    'report.edit_mode': 'Editar texto',
    'report.export_pdf': 'Exportar PDF',
    'report.export_json': 'Exportar JSON',
    'report.print': 'Imprimir',
    'report.source_block': 'Fonte:',
    'report.view_source_evidence': 'Ver evidência de origem',
    'report.traceability_quote': 'Do relatório de volta à evidência.',

    // Timeline & History
    'timeline.title': 'Linha do Tempo Cronológica',
    'timeline.subtitle': 'Trilha de eventos com rastreabilidade minuto a minuto.',
    'history.title': 'Histórico de Atividades',
    'history.subtitle': 'Registro de auditoria: quem fez o quê e quando.',

    // Map & Connections
    'map.title': 'Mapa de Evidências',
    'map.subtitle': 'Representação visual georreferenciada dos pontos e registros da fiscalização.',
    'map.demo_notice': 'Representação visual para demonstração.',
    'connections.title': 'Mapa Conceitual de Conexões',
    'connections.subtitle':
      'Grafo de interligação: Fiscalização ↔ Evidências ↔ Locais ↔ Documentos ↔ Pessoas ↔ Ocorrências.',

    // Assistant
    'assistant.title': 'Assistente RastroVerde',
    'assistant.disclaimer':
      'As sugestões do RastroVerde são apoio à análise. A decisão final permanece sob responsabilidade do agente competente.',
    'assistant.placeholder':
      'Pergunte ao assistente sobre inconsistências, lacunas ou evidências...',
    'assistant.send': 'Enviar',
    'assistant.new_chat': 'Nova conversa',
    'assistant.suggested_title': 'Comandos sugeridos para a fiscalização atual:',

    // About
    'about.title': 'Sobre o RastroVerde',
    'about.text':
      'O RastroVerde nasceu como uma solução para apoiar a organização de informações durante processos de fiscalização ambiental. A plataforma conecta evidências, registros de campo, localização e documentação em uma única trilha rastreável, ajudando agentes a identificar lacunas e inconsistências antes da elaboração do relatório.',
    'about.team_title': 'Equipe de Desenvolvimento',
    'about.differentials_title': 'Diferenciais da Plataforma',
    'about.diff_1': 'Rastreabilidade integral da evidência bruta até cada linha do relatório.',
    'about.diff_2':
      'Verificação inteligente de consistência de horários e coordenadas com linguagem prudente.',
    'about.diff_3':
      'Checklist automático de lacunas que impede relatórios incompletos ou vulneráveis juridicamente.',

    // Auth
    'auth.login_title': 'Acesso à Fiscalização',
    'auth.signup_title': 'Criar Conta de Agente',
    'auth.email': 'E-mail institucional',
    'auth.password': 'Senha',
    'auth.confirm_password': 'Confirmar senha',
    'auth.name': 'Nome completo',
    'auth.login_btn': 'Entrar',
    'auth.signup_btn': 'Criar conta',
    'auth.forgot_password': 'Esqueceu a senha?',
    'auth.forgot_password_title': 'Recuperar Senha',
    'auth.forgot_password_btn': 'Enviar link de recuperação',
    'auth.reset_password_title': 'Redefinir Senha',
    'auth.demo_hint': 'Entrar com conta demo',
    'auth.have_account': 'Já possui cadastro? Entrar',
    'auth.no_account': 'Não tem conta? Cadastre-se',
  },
  en: {
    // Brand & header
    'brand.name': 'RastroVerde',
    'brand.tagline':
      'From field evidence to environmental reports, with traceability and confidence.',
    'badge.demo': 'Demo data',
    'badge.fictional_demo': 'Fictional demo case',
    'footer.text': 'RastroVerde — Technology supporting environmental enforcement.',
    'footer.rights': '',

    // Navigation
    'nav.overview': 'Overview',
    'nav.inspections': 'Inspections',
    'nav.new_inspection': 'New Inspection',
    'nav.evidence': 'Evidence',
    'nav.map': 'Map',
    'nav.verification': 'Verification',
    'nav.gaps': 'Gaps',
    'nav.connections': 'Connections',
    'nav.assistant': 'Assistant',
    'nav.reports': 'Reports',
    'nav.history': 'History',
    'nav.about': 'About',
    'nav.logout': 'Sign out',
    'nav.login': 'Sign in',
    'nav.signup': 'Sign up',
    'nav.home': 'Home',
    'nav.quick_new': 'Create new',
    'nav.quick_new_insp': 'New Inspection',
    'nav.quick_new_evd': 'New Evidence',

    // Landing
    'landing.headline': 'From field evidence to environmental reports.',
    'landing.subheadline':
      'Organize records, connect evidence and identify missing information before drafting the inspection report.',
    'landing.start_inspection': 'Start inspection',
    'landing.view_demo': 'View demo',
    'landing.flow_field': 'Field',
    'landing.flow_evidence': 'Evidence',
    'landing.flow_verification': 'Verification',
    'landing.flow_gaps': 'Gaps',
    'landing.flow_report': 'Report',
    'landing.problem_title': 'The challenge in field enforcement',
    'landing.problem_desc':
      'During environmental operations, vital information is scattered across diverse physical and digital mediums.',
    'landing.problem_sources':
      'Photographs, field notes, geographic coordinates, physical documents, informal testimonies, violation records, and scattered observations.',
    'landing.problem_risks_title': 'Risks of manual organization',
    'landing.risk_forgotten': 'Forgotten field details and critical observations',
    'landing.risk_context': 'Evidence lacking clear context or georeferencing',
    'landing.risk_inconsistencies': 'Time and coordinate discrepancies',
    'landing.risk_duplications': 'Duplicate records and ambiguous entries',
    'landing.risk_gaps': 'Critical gaps discovered only at final drafting',
    'landing.proposal_title': 'Our proposal',
    'landing.proposal_desc':
      'RastroVerde creates an organized trail between each piece of collected evidence and the final report.',
    'landing.demo_card_title': 'Try model inspection RV-DEMO-001',
    'landing.demo_card_desc':
      'Explore our complete demo case with real field evidence, automated consistency checks, and a traceable report.',
    'landing.open_demo': 'Explore full demo',

    // Dashboard
    'dashboard.title': 'Enforcement Overview',
    'dashboard.stat_inspections': 'Inspections',
    'dashboard.stat_in_progress': 'In progress',
    'dashboard.stat_evidence': 'Evidence',
    'dashboard.stat_gaps': 'Gaps',
    'dashboard.recent_inspections': 'Recent Inspections',
    'dashboard.open_inspection': 'Open inspection',
    'dashboard.pipeline_title': 'Inspection & Traceability Pipeline',

    // Statuses
    'status.em_coleta': 'Collecting',
    'status.em_analise': 'Under analysis',
    'status.com_pendencias': 'With gaps',
    'status.pronta_relatorio': 'Ready for report',
    'status.finalizada': 'Finalized',

    // Evidence types
    'evd_type.fotografia': 'Photography',
    'evd_type.video': 'Video',
    'evd_type.audio': 'Audio',
    'evd_type.documento': 'Document',
    'evd_type.anotacao': 'Note',
    'evd_type.localizacao': 'Location',
    'evd_type.depoimento': 'Testimony',

    // Occurrence types
    'occ.desmatamento': 'Deforestation',
    'occ.queimada': 'Wildfire',
    'occ.mineracao': 'Illegal mining',
    'occ.ocupacao': 'Illegal occupation',
    'occ.poluicao': 'Pollution',
    'occ.extracao_madeira': 'Timber extraction',
    'occ.crime_fauna': 'Wildlife crime',
    'occ.outro': 'Other',

    // Inspections list & form
    'inspections.title': 'Environmental Inspections',
    'inspections.new': 'New Inspection',
    'inspections.search_placeholder': 'Search inspections by code, location, officer...',
    'inspections.all_status': 'All statuses',
    'inspections.empty': 'No inspections found.',
    'inspections.edit': 'Edit',
    'inspections.details': 'View details',
    'inspections.id_number': 'Identifier / Code',
    'inspections.date': 'Date',
    'inspections.time': 'Time',
    'inspections.agent': 'Responsible officer',
    'inspections.team': 'Field team',
    'inspections.location': 'Occurrence location',
    'inspections.municipality': 'Municipality',
    'inspections.state': 'State / Province',
    'inspections.latitude': 'Latitude',
    'inspections.longitude': 'Longitude',
    'inspections.occurrence_type': 'Occurrence type',
    'inspections.description': 'Initial description',
    'inspections.notes': 'Additional notes',
    'inspections.save': 'Save changes',
    'inspections.create': 'Create inspection',
    'inspections.cancel': 'Cancel',
    'inspections.created_success': 'Inspection created successfully!',
    'inspections.updated_success': 'Inspection updated successfully!',

    // Workspace / Detail
    'workspace.tabs.overview': 'Overview',
    'workspace.tabs.evidence': 'Evidence',
    'workspace.tabs.timeline': 'Timeline',
    'workspace.tabs.verification': 'Verification',
    'workspace.tabs.gaps': 'Gaps',
    'workspace.tabs.report': 'Report',
    'workspace.completeness_title': 'Inspection completeness',
    'workspace.completeness_advice': 'Before finalizing, review pending items.',
    'workspace.generate_report': 'Generate Report',
    'workspace.edit_inspection': 'Edit details',

    // Evidence center
    'evidence.title': 'Evidence Center',
    'evidence.add': 'Add evidence',
    'evidence.search_placeholder': 'Search evidence, documents or records...',
    'evidence.all_types': 'All types',
    'evidence.filter_by_type': 'Evidence type',
    'evidence.code': 'Identifier code',
    'evidence.officer': 'Recording officer',
    'evidence.coordinates': 'Coordinates (Lat / Long)',
    'evidence.tags': 'Tags (comma-separated)',
    'evidence.notes': 'Technical notes',
    'evidence.file_upload': 'File / Attached media',
    'evidence.status': 'Evidence status',
    'evidence.empty': 'No evidence found for selected filters.',
    'evidence.view_detail': 'View details',
    'evidence.edit': 'Edit',
    'evidence.remove': 'Delete',
    'evidence.confirm_delete_title': 'Delete evidence?',
    'evidence.confirm_delete_desc':
      'Are you sure you want to delete this evidence? This action will be recorded in the audit trail.',
    'evidence.delete_success': 'Evidence deleted successfully.',
    'evidence.create_success': 'Evidence added successfully!',
    'evidence.update_success': 'Evidence updated successfully!',
    'evidence.source_banner': 'Source evidence selected from the Inspection Report.',
    'evidence.back_to_report': 'Back to report',

    // Verification
    'verification.title': 'Consistency Verification',
    'verification.subtitle': 'Automated cross-check of field records with supportive posture.',
    'verification.rerun': 'Re-run verification',
    'verification.consistent': 'Consistent',
    'verification.review': 'Review',
    'verification.conflict': 'Conflict',
    'verification.missing': 'Missing information',
    'verification.cautious_notice':
      'The system never states crime or culpability. Analyses are supportive suggestions for the competent officer.',
    'verification.go_to_evidence': 'View related evidence',

    // Gaps
    'gaps.title': 'What is still missing?',
    'gaps.subtitle':
      'Smart checklist verifying inspection integrity before issuing the violation report.',
    'gaps.completed': 'Completed',
    'gaps.pending_review': 'Pending review',
    'gaps.missing_item': 'Missing / Action required',
    'gaps.action_add': 'Add',

    // Report
    'report.title': 'Violation Report Generator',
    'report.draft_notice': 'Draft generated from recorded information. Review before issuing.',
    'report.view_mode': 'View report',
    'report.edit_mode': 'Edit text',
    'report.export_pdf': 'Export PDF',
    'report.export_json': 'Export JSON',
    'report.print': 'Print',
    'report.source_block': 'Source:',
    'report.view_source_evidence': 'View source evidence',
    'report.traceability_quote': 'From the report back to the evidence.',

    // Timeline & History
    'timeline.title': 'Chronological Timeline',
    'timeline.subtitle': 'Event trail with minute-by-minute traceability.',
    'history.title': 'Activity History',
    'history.subtitle': 'Audit log: who did what and when.',

    // Map & Connections
    'map.title': 'Evidence Map',
    'map.subtitle': 'Georeferenced visual representation of inspection points and records.',
    'map.demo_notice': 'Visual representation for demonstration.',
    'connections.title': 'Conceptual Evidence Map',
    'connections.subtitle':
      'Connection graph: Inspection ↔ Evidence ↔ Locations ↔ Documents ↔ Persons ↔ Occurrences.',

    // Assistant
    'assistant.title': 'RastroVerde Assistant',
    'assistant.disclaimer':
      'RastroVerde suggestions support analysis. Final decisions remain the responsibility of the competent officer.',
    'assistant.placeholder': 'Ask the assistant about inconsistencies, gaps or evidence...',
    'assistant.send': 'Send',
    'assistant.new_chat': 'New chat',
    'assistant.suggested_title': 'Suggested prompts for current inspection:',

    // About
    'about.title': 'About RastroVerde',
    'about.text':
      'RastroVerde was born as a solution to support information organization during environmental enforcement processes. The platform connects evidence, field records, location and documentation into a single traceable path, helping officers identify gaps and inconsistencies before drafting the report.',
    'about.team_title': 'Development Team',
    'about.differentials_title': 'Platform Differentials',
    'about.diff_1': 'End-to-end traceability from raw field evidence to each line of the report.',
    'about.diff_2':
      'Smart time and coordinate consistency checks with strictly supportive language.',
    'about.diff_3':
      'Automated gaps checklist that prevents legally vulnerable or incomplete reports.',

    // Auth
    'auth.login_title': 'Officer Sign In',
    'auth.signup_title': 'Register Officer Account',
    'auth.email': 'Official email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm password',
    'auth.name': 'Full name',
    'auth.login_btn': 'Sign In',
    'auth.signup_btn': 'Create account',
    'auth.forgot_password': 'Forgot password?',
    'auth.forgot_password_title': 'Recover Password',
    'auth.forgot_password_btn': 'Send reset link',
    'auth.reset_password_title': 'Set New Password',
    'auth.demo_hint': 'Sign in with demo account',
    'auth.have_account': 'Already registered? Sign in',
    'auth.no_account': 'Need an account? Sign up',
  },
}

const I18nContext = createContext<I18nContextType>({
  lang: 'pt',
  setLang: () => {},
  t: (k) => k,
})

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('rastroverde_lang')
    return saved === 'en' || saved === 'pt' ? saved : 'pt'
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('rastroverde_lang', newLang)
  }

  const t = (key: string): string => {
    return translations[lang]?.[key] ?? translations.pt[key] ?? key
  }

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
