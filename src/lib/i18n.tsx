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
    'landing.amazoniahack_badge': 'Projeto de código aberto desenvolvido para o AmazoniaHack',
    'about.amazoniahack_title': 'Código Aberto & AmazoniaHack',
    'about.amazoniahack_desc':
      'O RastroVerde é um projeto de código aberto desenvolvido no âmbito do AmazoniaHack, dedicado a fortalecer a transparência, a rastreabilidade probatória e o rigor técnico na fiscalização socioambiental da Amazônia.',
    'tour.button': 'Tour guiado',
    'tour.button_pitch': 'Tour guiado (Pitch)',
    'tour.step_of': 'Passo {current} de {total}',
    'tour.next': 'Próximo',
    'tour.prev': 'Anterior',
    'tour.end': 'Encerrar tour',
    'tour.finish': 'Concluir pitch',
    'tour.step1_badge': 'Dossiê',
    'tour.step2_badge': 'Evidências',
    'tour.step3_badge': 'Geo',
    'tour.step4_badge': 'Timeline',
    'tour.step5_badge': 'Consistência',
    'tour.step6_badge': 'Lacunas',
    'tour.step7_badge': 'Relatório',
    'tour.step8_badge': 'Rastreabilidade',
    'tour.step1_title': '1. Fiscalização Demo (RV-DEMO-001)',
    'tour.step1_desc':
      'Início do dossiê: área de proteção ambiental com alertas de satélite e equipe em campo.',
    'tour.step2_title': '2. Evidências Coletadas',
    'tour.step2_desc':
      'Centro de evidências: fotografias de campo, medições de coordenadas, anexos e notificações.',
    'tour.step3_title': '3. Mapa Georreferenciado',
    'tour.step3_desc': 'Visualização espacial das evidências sobre a poligonal da área protegida.',
    'tour.step4_title': '4. Linha do Tempo Cronológica',
    'tour.step4_desc': 'Rastreabilidade minuto a minuto das ações registradas pela equipe.',
    'tour.step5_title': '5. Verificação de Consistência',
    'tour.step5_desc':
      'Detecção inteligente de possíveis discrepâncias entre horários e coordenadas com postura cautelosa.',
    'tour.step6_title': '6. Lacunas e Pendências',
    'tour.step6_desc': 'Checklist automático: o que ainda falta antes de emitir o relatório.',
    'tour.step7_title': '7. Gerar Relatório Técnico',
    'tour.step7_desc':
      'Dossiê estruturado com rastreabilidade direta: clique em "Ver evidência de origem".',
    'tour.step8_title': '8. Rastreabilidade Completa (EVD-014)',
    'tour.step8_desc':
      'Do relatório de volta à evidência original (EVD-014)! Conexão bidirecional validada.',
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
      'Organize registros de campo, amarre evidências georreferenciadas e detecte lacunas probatórias antes de emitir o relatório pericial.',
    'landing.start_inspection': 'Iniciar fiscalização',
    'landing.view_demo': 'Ver demonstração',
    'landing.enter_demo': 'Acessar demonstração interativa',
    'landing.flow_field': 'Vistoria em campo',
    'landing.flow_evidence': 'Custódia de evidências',
    'landing.flow_verification': 'Checagem de consistência',
    'landing.flow_gaps': 'Auditoria de lacunas',
    'landing.flow_report': 'Relatório rastreável',
    'landing.flow_title': 'Trilha Contínua de Rastreabilidade',
    'landing.flow_subtitle':
      'Cadeia de custódia digital do primeiro ponto de GPS até a conclusão técnica',
    'landing.problem_title': 'O desafio real da fiscalização em campo',
    'landing.problem_desc':
      'Em operações ambientais, dados críticos ficam dispersos em múltiplos suportes físicos e digitais, gerando fragilidade processual e retrabalho técnico.',
    'landing.problem_sources':
      'Fotos no celular, cadernetas em papel, coordenadas avulsas de GPS, documentos dominiais, autos físicos e relatos verbais desvinculados.',
    'landing.problem_sources_subtitle': 'Fontes fragmentadas e sem amarra de custódia',
    'landing.problem_risks_title': 'Riscos da compilação manual',
    'landing.problem_risks_subtitle':
      'A falta de conexão imediata entre fatos e evidências compromete a validade dos autos',
    'landing.risk_forgotten': 'Fatos e detalhes cruciais perdidos entre o campo e o gabinete',
    'landing.risk_context': 'Fotografias e mídias sem coordenadas geográficas certificadas',
    'landing.risk_inconsistencies':
      'Divergências ocultas entre carimbos de hora e posições de satélite',
    'landing.risk_duplications': 'Duplicações e registros sobrepostos que confundem a perícia',
    'landing.risk_gaps': 'Documentos dominiais pendentes descobertos apenas no prazo final',
    'landing.proposal_title': 'Nossa proposta técnica',
    'landing.proposal_desc':
      'O RastroVerde estabelece um elo auditável entre cada elemento coletado em campo e o relatório final.',
    'landing.proposal_highlight': 'Do relatório de volta à evidência original.',
    'landing.proposal_explanation':
      'Rastreabilidade bidirecional: peritos, fiscais e tribunais podem clicar em qualquer apontamento do relatório para inspecionar imediatamente a coordenada, a foto bruta e a assinatura funcional.',
    'landing.demo_card_title': 'Caso Demonstrativo Interativo: APA Setor Norte (RV-DEMO-001)',
    'landing.demo_card_desc':
      'Navegue por uma fiscalização simulada com alertas DETER, marcas de maquinário, checagem automatizada de consistência e 3 falhas propositais para testar a ferramenta.',
    'landing.demo_step1': 'Dossiê georreferenciado da Unidade de Conservação com equipe e alertas',
    'landing.demo_step2': 'Repositório de fotos brutas, notas de campo, coordenadas e anexos',
    'landing.demo_step3': 'Varredura automática de coerência entre cronologia e coordenadas GNSS',
    'landing.demo_step4':
      'Emissão de relatório técnico estruturado com âncoras diretas para as fontes',
    'landing.open_demo': 'Explorar caso interativo',
    'landing.access_block_title': 'Acesso Institucional para Órgãos de Controle',
    'landing.access_block_desc':
      'Plataforma segura para equipes de fiscalização ambiental, peritos criminais e analistas de órgãos gestores.',
    'landing.access_benefit_1': 'Cadeia de custódia digital inviolável para registros de campo',
    'landing.access_benefit_2': 'Cruzamento cauteloso de horários e coordenadas antes da emissão',
    'landing.access_benefit_3': 'Relatórios técnicos estruturados com rastreabilidade bidirecional',
    'landing.btn_access_agent': 'Entrar com credencial funcional',
    'landing.btn_create_account': 'Solicitar cadastro institucional',

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
    'evidence.file_help': 'Imagens (JPG, PNG, WebP), PDFs, áudio ou vídeo (máx. 25MB).',
    'evidence.file_size_error': 'Arquivo muito grande. O limite máximo é de 25MB.',
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
    'demo.nav_badge': 'Modo Demonstração (RV-DEMO-001)',
    'demo.read_only_tip':
      'Você está visualizando a demonstração fictícia com dados de campo reais.',
    'demo.login_prompt': 'Acesso Completo',
    'demo.banner_title': 'Ambiente de Demonstração Interativa (RV-DEMO-001)',
    'demo.banner_desc':
      'Você está explorando uma fiscalização simulada na APA Setor Norte. Navegue pelas evidências, verifique consistências e teste a rastreabilidade do relatório final.',
    'demo.back_to_landing': 'Voltar ao início',
    'demo.tour_invite': 'Iniciar Tour Guiado (8 passos)',
    'demo.agent_login': 'Entrar como agente',

    // Auth
    'auth.login_title': 'Acesso à Fiscalização',
    'auth.login_subtitle':
      'Entre com sua credencial funcional para acessar os dossiês e emitir relatórios rastreáveis.',
    'auth.signup_title': 'Criar Conta de Agente',
    'auth.signup_subtitle':
      'Cadastro exclusivo para agentes ambientais, peritos e servidores públicos de fiscalização.',
    'auth.email': 'E-mail institucional',
    'auth.password': 'Senha',
    'auth.confirm_password': 'Confirmar senha',
    'auth.name': 'Nome completo e cargo',
    'auth.login_btn': 'Entrar',
    'auth.signup_btn': 'Criar conta institucional',
    'auth.forgot_password': 'Esqueceu a senha?',
    'auth.forgot_password_title': 'Recuperar Senha',
    'auth.forgot_password_subtitle':
      'Informe seu e-mail institucional para receber o link seguro de redefinição.',
    'auth.forgot_password_btn': 'Enviar link de recuperação',
    'auth.reset_password_title': 'Redefinir Senha',
    'auth.reset_password_subtitle':
      'Defina uma nova senha para restabelecer o acesso à sua conta institucional.',
    'auth.password_reset_success':
      'Senha alterada com sucesso! Você já pode acessar a plataforma com sua nova credencial.',
    'auth.password_reset_error':
      'Não foi possível redefinir a senha. O token pode estar incorreto ou expirado. Solicite um novo link.',
    'auth.have_account': 'Já possui cadastro? Entrar',
    'auth.no_account': 'Não tem conta? Solicitar cadastro',
    'auth.security_notice':
      'Acesso monitorado e protegido para integridade da cadeia de custódia socioambiental.',
    'auth.back_to_home': 'Voltar à página inicial',
    'auth.back_to_login': 'Voltar ao login',
    'auth.demo_entry_prompt': 'Quer apenas conhecer a ferramenta?',
    'auth.demo_entry_btn': 'Ver Demonstração sem cadastro',
    'auth.password_min_length': 'Mínimo de 8 caracteres recomendando letras e números',
  },
  en: {
    // Brand & header
    'brand.name': 'RastroVerde',
    'brand.tagline':
      'From field evidence to environmental reports, with traceability and confidence.',
    'badge.demo': 'Demo data',
    'badge.fictional_demo': 'Fictional demo case',
    'footer.text': 'RastroVerde — Technology supporting environmental enforcement.',
    'landing.amazoniahack_badge': 'Open-source project developed for AmazoniaHack',
    'about.amazoniahack_title': 'Open Source & AmazoniaHack',
    'about.amazoniahack_desc':
      'RastroVerde is an open-source initiative developed for AmazoniaHack, committed to reinforcing transparency, evidentiary traceability, and technical integrity across Amazon socio-environmental enforcement.',
    'tour.button': 'Guided tour',
    'tour.button_pitch': 'Guided tour (Pitch)',
    'tour.step_of': 'Step {current} of {total}',
    'tour.next': 'Next',
    'tour.prev': 'Previous',
    'tour.end': 'End tour',
    'tour.finish': 'Complete pitch',
    'tour.step1_badge': 'Dossier',
    'tour.step2_badge': 'Evidence',
    'tour.step3_badge': 'Geo',
    'tour.step4_badge': 'Timeline',
    'tour.step5_badge': 'Consistency',
    'tour.step6_badge': 'Gaps',
    'tour.step7_badge': 'Report',
    'tour.step8_badge': 'Traceability',
    'tour.step1_title': '1. Demo Inspection (RV-DEMO-001)',
    'tour.step1_desc':
      'Dossier start: protected environmental area with satellite alert and field officers.',
    'tour.step2_title': '2. Collected Evidence',
    'tour.step2_desc':
      'Evidence center: field photos, georeferenced coordinates, attachments and formal notices.',
    'tour.step3_title': '3. Georeferenced Map',
    'tour.step3_desc':
      'Spatial layout of evidence markers on top of the protected reserve polygon.',
    'tour.step4_title': '4. Chronological Timeline',
    'tour.step4_desc': 'Minute-by-minute traceability of all operational field activities.',
    'tour.step5_title': '5. Consistency Verification',
    'tour.step5_desc':
      'Smart detection of potential discrepancies between field notes and GPS readings with cautious tone.',
    'tour.step6_title': '6. Gaps & Completeness',
    'tour.step6_desc': 'Automated checklist: identifying missing items before drafting the report.',
    'tour.step7_title': '7. Generate Technical Report',
    'tour.step7_desc':
      'Structured report with direct traceability: click on "View source evidence".',
    'tour.step8_title': '8. Full Traceability Achieved (EVD-014)',
    'tour.step8_desc':
      'From the final report right back to the original field evidence (EVD-014)! Bidirectional link verified.',
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
      'Organize field records, bind georeferenced evidence, and detect evidentiary gaps before issuing the forensic report.',
    'landing.start_inspection': 'Start inspection',
    'landing.view_demo': 'View demo',
    'landing.enter_demo': 'Explore interactive demo',
    'landing.flow_field': 'Field inspection',
    'landing.flow_evidence': 'Evidence custody',
    'landing.flow_verification': 'Consistency check',
    'landing.flow_gaps': 'Gaps audit',
    'landing.flow_report': 'Traceable report',
    'landing.flow_title': 'Continuous Traceability Pipeline',
    'landing.flow_subtitle':
      'A digital chain of custody from the first GPS coordinate to the final technical conclusion',
    'landing.problem_title': 'The actual challenge in field enforcement',
    'landing.problem_desc':
      'During environmental operations, critical data is scattered across disconnected mediums, creating administrative vulnerability and expert rework.',
    'landing.problem_sources':
      'Phone photos, paper clipboards, isolated GPS waypoints, land title registries, physical notices, and detached witness statements.',
    'landing.problem_sources_subtitle': 'Fragmented field sources lacking custodial linkage',
    'landing.problem_risks_title': 'Risks of manual consolidation',
    'landing.problem_risks_subtitle':
      'The disconnect between facts and evidence weakens administrative enforcement',
    'landing.risk_forgotten':
      'Crucial field observations lost between ground operations and headquarters',
    'landing.risk_context': 'Photographs and recordings lacking certified geographic coordinates',
    'landing.risk_inconsistencies':
      'Latent discrepancies between timestamps and satellite readings',
    'landing.risk_duplications':
      'Duplicate records and conflicting descriptions that impede review',
    'landing.risk_gaps': 'Missing title deeds or permits discovered only when deadlines expire',
    'landing.proposal_title': 'Our technical proposal',
    'landing.proposal_desc':
      'RastroVerde creates an unbroken, auditable link between each field finding and the final report.',
    'landing.proposal_highlight': 'From the report straight back to original evidence.',
    'landing.proposal_explanation':
      'Bidirectional traceability: auditors, prosecutors, and magistrates can click any paragraph in the technical report to immediately review the raw photo, coordinate metadata, and officer signature.',
    'landing.demo_card_title': 'Interactive Demonstration Case: North Sector APA (RV-DEMO-001)',
    'landing.demo_card_desc':
      'Experience a simulated operation featuring DETER alerts, heavy machinery tracks, automated consistency checks, and 3 deliberate gaps to test verification.',
    'landing.demo_step1': 'Conservation unit dossier with georeferenced coordinates and field crew',
    'landing.demo_step2': 'Custodial repository of raw photographs, audio notes, and attachments',
    'landing.demo_step3': 'Automated cross-check validating timestamps against GNSS coordinates',
    'landing.demo_step4':
      'Structured technical report generation with direct anchors to ground sources',
    'landing.open_demo': 'Launch interactive case',
    'landing.access_block_title': 'Institutional Portal for Oversight Agencies',
    'landing.access_block_desc':
      'Secure environment for socio-environmental enforcement squads, forensic experts, and inspectors.',
    'landing.access_benefit_1': 'Tamper-evident digital chain of custody for field observations',
    'landing.access_benefit_2':
      'Cautious cross-checking of timestamps and coordinates prior to release',
    'landing.access_benefit_3': 'Standardized technical reports with direct source traceability',
    'landing.btn_access_agent': 'Sign in with official credentials',
    'landing.btn_create_account': 'Request institutional account',

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
    'evidence.file_help': 'Images (JPG, PNG, WebP), PDFs, audio or video (max 25MB).',
    'evidence.file_size_error': 'File too large. Maximum size is 25MB.',
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
    'demo.nav_badge': 'Demo Mode (RV-DEMO-001)',
    'demo.read_only_tip': 'You are viewing the fictional demonstration with realistic field data.',
    'demo.login_prompt': 'Full Access',
    'demo.banner_title': 'Interactive Demonstration Environment (RV-DEMO-001)',
    'demo.banner_desc':
      'You are exploring a simulated inspection in the North Sector APA. Browse evidence, run consistency checks, and verify report traceability.',
    'demo.back_to_landing': 'Back to home',
    'demo.tour_invite': 'Start Guided Tour (8 steps)',
    'demo.agent_login': 'Sign in as officer',

    // Auth
    'auth.login_title': 'Officer Sign In',
    'auth.login_subtitle':
      'Sign in with your official agency credentials to manage dossiers and generate traceable reports.',
    'auth.signup_title': 'Register Officer Account',
    'auth.signup_subtitle':
      'Dedicated access for environmental enforcement officers, forensic experts, and public auditors.',
    'auth.email': 'Official email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm password',
    'auth.name': 'Full name and title',
    'auth.login_btn': 'Sign In',
    'auth.signup_btn': 'Create official account',
    'auth.forgot_password': 'Forgot password?',
    'auth.forgot_password_title': 'Recover Password',
    'auth.forgot_password_subtitle':
      'Provide your registered official email to receive a secure recovery link.',
    'auth.forgot_password_btn': 'Send reset link',
    'auth.reset_password_title': 'Set New Password',
    'auth.reset_password_subtitle':
      'Choose a new password to re-establish your secure workspace access.',
    'auth.password_reset_success':
      'Password changed successfully! You can now sign in with your new credential.',
    'auth.password_reset_error':
      'Could not reset password. The token may be incorrect or expired. Please request a new link.',
    'auth.have_account': 'Already registered? Sign in',
    'auth.no_account': 'Need an account? Request access',
    'auth.security_notice':
      'Monitored and protected access ensuring socio-environmental chain of custody integrity.',
    'auth.back_to_home': 'Back to home',
    'auth.back_to_login': 'Back to sign in',
    'auth.demo_entry_prompt': 'Just exploring the platform?',
    'auth.demo_entry_btn': 'View Demo without signing up',
    'auth.password_min_length': 'Minimum 8 characters with letters and numbers recommended',
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
