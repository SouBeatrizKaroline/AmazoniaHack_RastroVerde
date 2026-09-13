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
    'badge.demo': 'Dados fictícios de demonstração',
    'badge.fictional_demo': 'Dados sintéticos de demonstração',
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
    'landing.headline':
      'Da evidência de campo ao relatório de infração, com organização e rastreabilidade.',
    'landing.subheadline':
      'Para secretarias de meio ambiente e agentes de campo: organize evidências dispersas, saneie lacunas antes do prazo e gere minutas de relatório onde cada parágrafo aponta diretamente para sua evidência de origem.',
    'landing.start_inspection': 'Analisar ocorrência',
    'landing.view_demo': 'Ver demonstração',
    'landing.enter_demo': 'Explorar demonstração',
    'landing.btn_demo': 'Explorar caso de demonstração',
    'landing.how_it_works_title': 'Como o RastroVerde funciona',
    'landing.step1_title': '1. Ocorrência',
    'landing.step1_desc':
      'Registro dos dados institucionais, local da ocorrência e abertura formal da fiscalização.',
    'landing.step1_highlight': 'Registro Inicial',
    'landing.step2_title': '2. Evidências',
    'landing.step2_desc':
      'Fotografias com metadados, gravações, notas de campo e documentos vinculados à ocorrência.',
    'landing.step2_highlight': 'Organização Probatória',
    'landing.step3_title': '3. Extração',
    'landing.step3_desc':
      'Extração de fatos técnicos, coordenadas, áreas afetadas e qualificação dos envolvidos.',
    'landing.step3_highlight': 'Fatos Estruturados',
    'landing.step4_title': '4. Verificação',
    'landing.step4_desc':
      'Cruzamento prudente de dados, identificação de divergências e lacunas documentais.',
    'landing.step4_highlight': 'Triagem Cautelosa',
    'landing.step5_title': '5. Minuta',
    'landing.step5_desc':
      'Minuta do relatório de infração em 10 seções padronizadas adaptadas ao perfil do município.',
    'landing.step5_highlight': 'Relatório Estruturado',
    'landing.step6_title': '6. Revisão humana',
    'landing.step6_desc':
      'A decisão é sempre do fiscal: revisão, homologação expressa e emissão com rastreabilidade.',
    'landing.step6_highlight': 'Validação do Agente',
    'landing.folder_badge': 'A evidência não deve terminar numa pasta.',
    'landing.folder_headline': 'A evidência não deve terminar esquecida numa pasta de arquivos.',
    'landing.folder_desc':
      'Evidências voltam do campo em múltiplos formatos: fotos no celular, áudio gravado, anotações de prancheta e coordenadas esparsas. O RastroVerde conecta cada fato à sua evidência de origem e responde: conseguimos produzir uma minuta defensável mostrando exatamente qual evidência sustenta cada afirmação?',
    'landing.flow_field': 'Fiscalização em campo',
    'landing.flow_evidence': 'Organização de evidências',
    'landing.flow_verification': 'Verificação de consistência',
    'landing.flow_gaps': 'Checklist de pendências',
    'landing.flow_report': 'Relatório de infração rastreável',
    'landing.flow_title': 'Jornada Lógica da Fiscalização Ambiental',
    'landing.flow_subtitle':
      'Ocorrência → Evidências → Extração → Verificação → Minuta → Revisão humana',
    'landing.problem_title': 'O desafio real da fiscalização em campo',
    'landing.problem_desc':
      'Em operações ambientais, dados críticos ficam dispersos em múltiplos suportes físicos e digitais, gerando fragilidade processual e retrabalho técnico.',
    'landing.problem_sources':
      'Fotos no celular, cadernetas em papel, coordenadas avulsas de GPS, documentos dominiais, autos físicos e relatos verbais desvinculados.',
    'landing.problem_sources_subtitle': 'Fontes fragmentadas e sem vínculo direto',
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
      'Rastreabilidade bidirecional: peritos, fiscais e tribunais podem clicar em qualquer apontamento do relatório para verificar imediatamente a coordenada, a foto bruta e a identificação do agente.',
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
    'landing.access_benefit_1': 'Registro organizado e rastreável de evidências de campo',
    'landing.access_benefit_2': 'Cruzamento cauteloso de horários e coordenadas antes da emissão',
    'landing.access_benefit_3':
      'Relatórios de infração estruturados com rastreabilidade bidirecional',
    'landing.btn_access_agent': 'Entrar com credencial funcional',
    'landing.btn_create_account': 'Solicitar cadastro institucional',

    // Dashboard
    'dashboard.title': 'Visão Geral da Fiscalização',
    'dashboard.stat_inspections': 'Ocorrências',
    'dashboard.stat_inspections_desc': 'Operações registradas em base',
    'dashboard.stat_ready_for_report': 'Prontas para relatório',
    'dashboard.stat_ready_desc': 'Evidências suficientes e validadas',
    'dashboard.stat_missing_info': 'Com informações faltantes',
    'dashboard.stat_missing_desc': 'Lacunas requerendo complementação',
    'dashboard.stat_divergences': 'Com divergências',
    'dashboard.stat_divergences_desc': 'Conflito entre fontes de campo',
    'dashboard.stat_in_progress': 'Em andamento',
    'dashboard.stat_in_progress_desc': 'Coleta em campo ou análise técnica',
    'dashboard.stat_evidence': 'Evidências',
    'dashboard.stat_evidence_desc': 'Fotos, termos e arquivos vinculados',
    'dashboard.stat_gaps': 'Pendências',
    'dashboard.stat_gaps_desc': 'Pontos requerendo complementação',
    'dashboard.recent_inspections': 'Fiscalizações Recentes',
    'dashboard.recent_inspections_desc': 'Dossiês operacionais e cadeias probatórias em andamento',
    'dashboard.view_all': 'Ver todas',
    'dashboard.open_inspection': 'Abrir fiscalização',
    'dashboard.pipeline_title': 'Trilha de Fiscalização e Rastreabilidade',
    'dashboard.pipeline_subtitle': 'Rastreabilidade contínua de ponta a ponta',
    'dashboard.legend_title': 'Legenda de Status',
    'dashboard.badge_sub': 'Painel integrado de controle operacional',
    'dashboard.tag_governance': 'Governança & Fiscalização',
    'dashboard.stat_count_evidence': '{count} evidências',
    'dashboard.stat_count_review': '{count} em revisão',
    'dashboard.pipeline_step1': '1. Fiscalização',
    'dashboard.pipeline_step2': '2. Evidências',
    'dashboard.pipeline_step3': '3. Verificação',
    'dashboard.pipeline_step4': '4. Lacunas',
    'dashboard.pipeline_step5': '5. Relatório',

    // Statuses
    'status.em_coleta': 'Evidências recebidas',
    'status.em_analise': 'Em análise',
    'status.com_pendencias': 'Requer complementação',
    'status.requer_validacao': 'Requer validação',
    'status.pronta_relatorio': 'Pronto para minuta',
    'status.minuta_gerada': 'Minuta gerada',
    'status.finalizada': 'Revisado',

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
    'workspace.tabs.extraction': 'Informações extraídas',
    'workspace.tabs.timeline': 'Linha do tempo',
    'workspace.tabs.verification': 'Verificação',
    'workspace.tabs.gaps': 'Pendências e Lacunas',
    'workspace.tabs.report': 'Minuta do Relatório',
    'workspace.tabs.instruments': 'Instrumentos Relacionados',
    'workspace.completeness_title': 'Completude da fiscalização',
    'workspace.completeness_advice': 'Antes de finalizar, revise os itens pendentes.',
    'workspace.generate_report': 'Gerar Relatório',
    'workspace.edit_inspection': 'Editar dados',
    'workspace.change_status': 'Alterar status',
    'workspace.loading': 'Carregando dados da fiscalização...',
    'workspace.not_found': 'Fiscalização não localizada',
    'workspace.overview_context_title': 'Contextualização e Fatos Observados',
    'workspace.overview_notes_title': 'Observações Complementares da Equipe:',
    'workspace.overview_no_desc': 'Nenhuma descrição inicial registrada.',
    'workspace.field_evidence_title': 'Evidências Coletadas em Campo',
    'workspace.view_all_evidence': 'Ver todas',
    'workspace.tech_data_title': 'Dados Técnicos',
    'workspace.tech_occurrence_type': 'Tipo de Ocorrência:',
    'workspace.tech_team': 'Equipe Responsável:',
    'workspace.tech_team_unspecified': 'Não informada',
    'workspace.tech_coords': 'Coordenadas de Referência:',
    'workspace.quick_alert_title': 'Atenção: 3 Pendências e 1 Inconsistência',
    'workspace.quick_alert_desc':
      'O sistema identificou possíveis divergências de coordenadas e documentos dominiais ausentes.',
    'workspace.quick_alert_action': 'Verificar Integridade do Caso',
    'workspace.verification_card_desc':
      'Acesse o painel dedicado para analisar cruzamentos detalhados de dados, horários, coordenadas e inconsistências identificadas automaticamente com postura de apoio.',
    'workspace.verification_card_btn': 'Abrir Painel Completo de Verificação',
    'workspace.gaps_card_desc':
      'Consulte a lista de requisitos técnicos e documentais que precisam ser revisados antes da elaboração final do laudo pericial.',
    'workspace.gaps_card_btn': 'Abrir Checklist de Pendências',
    'workspace.report_card_desc':
      'Relatório técnico preliminar com fundamentação em campo e rastreabilidade probatória bidirecional até as evidências registradas.',
    'workspace.report_card_btn': 'Abrir Gerador de Relatório',
    'workspace.add_evidence': 'Adicionar Evidência',
    'workspace.status_updated': 'Status atualizado para: {status}',
    'workspace.status_update_error': 'Erro ao alterar status',
    'workspace.timeline_actor': 'por {actor}',
    'workspace.timeline_view_linked': 'Ver evidência vinculada',
    'workspace.evidence_field_photo': 'Registro Fotográfico de Campo',
    'workspace.attached_video': 'Vídeo anexado',
    'workspace.attached_audio': 'Áudio gravado',
    'workspace.open_document': 'Abrir documento',
    'workspace.unidentified_officer_warning': '⚠ Responsável não identificado (Lacuna)',
    'workspace.category_filter_title': 'Categorias de Análise:',
    'workspace.integrity_status_title': 'Status de Integridade da Fiscalização',
    'workspace.items_fulfilled': '{completed} de {total} requisitos atendidos',
    'workspace.item_validated': 'Validado',

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
    'verification.posture_title': 'Postura Técnica e Cautelosa da Plataforma',
    'verification.cautious_detail':
      'Termos como "Possível inconsistência", "Recomenda-se verificar" e "Informação não localizada" apoiam a prudência técnica do procedimento.',
    'verification.rec_title': 'Recomendação técnica:',
    'verification.ref_prefix': 'Ref:',
    'verification.rerun': 'Reexecutar verificação',
    'verification.consistent': 'Consistente',
    'verification.review': 'Verificar',
    'verification.conflict': 'Conflito',
    'verification.missing': 'Informação ausente',
    'verification.cautious_notice':
      'O sistema nunca afirma existência de infração ou culpabilidade. As análises são sugestões para apoiar o agente.',
    'verification.go_to_evidence': 'Ver evidência relacionada',
    'verification.toast_done_title': 'Verificação de consistência concluída',
    'verification.toast_done_desc':
      'Todos os registros de campo foram cruzados e recalculados contra a base.',

    // Gaps
    'gaps.title': 'O que ainda falta?',
    'gaps.subtitle':
      'Checklist inteligente de integridade da fiscalização para subsidiar a emissão do relatório.',
    'gaps.go_to_report': 'Ir para Elaboração de Relatório',
    'gaps.toast_validated': 'Item já conferido e validado.',
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
      'RastroVerde é uma ferramenta de apoio à elaboração de relatórios de fiscalização ambiental que organiza evidências de campo, identifica lacunas e mantém cada informação da minuta ligada à evidência que a sustenta.',
    'about.team_title': 'Equipe de Desenvolvimento',
    'about.differentials_title': 'Diferenciais da Plataforma',
    'about.diff_1': 'Rastreabilidade integral da evidência bruta até cada linha do relatório.',
    'about.diff_2':
      'Verificação inteligente de consistência de horários e coordenadas com linguagem prudente.',
    'about.diff_3':
      'Checklist automático de lacunas que sinaliza pendências antes da finalização do relatório.',
    'about.privacy_link': 'Política de Privacidade e Conformidade LGPD',

    // LGPD & Privacy
    'privacy.title': 'Privacidade e Proteção de Dados (LGPD)',
    'privacy.subtitle':
      'Compromisso com a Lei Geral de Proteção de Dados (Lei Federal nº 13.709/2018) na fiscalização ambiental.',
    'privacy.fictional_demo_notice_title':
      'Ambiente de Demonstração — Dados Estritamente Fictícios',
    'privacy.fictional_demo_notice_desc':
      'Para fins do AmazoniaHack e demonstração pública (caso RV-DEMO-001), todos os nomes de agentes, pessoas citadas, coordenadas geográficas, números de processos e documentos são sintéticos e concebidos exclusivamente para demonstração de capacidade técnica.',
    'privacy.section1_title': '1. Quais Dados o Sistema Trata',
    'privacy.section1_desc':
      'O RastroVerde opera no âmbito da instrução técnica e probatória da fiscalização ambiental municipal e estadual. O tratamento compreende:',
    'privacy.section1_item1':
      'Dados funcionais dos agentes públicos: nome completo, e-mail institucional, cargo e identificador funcional de registro;',
    'privacy.section1_item2':
      'Dados das ocorrências ambientais: nomes de autuados, representantes ou ocupantes quando qualificados formalmente;',
    'privacy.section1_item3':
      'Documentos de identificação fiscal (CPF/CNPJ) e cadastros rurais (número de CAR), estritamente quando existentes e anexados aos autos;',
    'privacy.section1_item4':
      'Evidências de campo georreferenciadas: fotografias técnicas, gravações de áudio com minutagem, vídeos de constatação, anotações de caderneta de campo e coordenadas GNSS (SIRGAS 2000).',
    'privacy.section2_title': '2. Base Legal de Tratamento (Arts. 7º e 23 da LGPD)',
    'privacy.section2_desc':
      'O tratamento de dados pessoais no RastroVerde é fundamentado nos estritos termos da Lei nº 13.709/2018:',
    'privacy.section2_item1':
      'Execução de Políticas Públicas (art. 7º, III e art. 23): atendimento da finalidade pública na persecução e instrução de processos administrativos de fiscalização ambiental;',
    'privacy.section2_item2':
      'Exercício Regular de Competências Legais: cumprimento do dever legal e regulamentar conferido aos órgãos de fiscalização do SISNAMA;',
    'privacy.section2_item3':
      'Contas de Usuários Voluntárias (art. 7º, I): para criação de contas de agentes institucionais e navegação, fundamentado no consentimento e termo de uso funcional.',
    'privacy.section3_title': '3. Papel do Sistema: Estrito Apoio à Decisão Humana',
    'privacy.section3_desc':
      'Em total alinhamento com o art. 20 da LGPD e os princípios de governança pública responsável:',
    'privacy.section3_highlight':
      'Não há decisão automatizada que afete o titular. O RastroVerde atua única e exclusivamente como suporte técnico à organização probatória.',
    'privacy.section3_subdesc':
      'Toda sugestão de enquadramento, identificação de divergência ou minuta de relatório requer revisão humana, homologação expressa e assinatura pelo agente fiscal ou autoridade competente antes de produzir qualquer efeito jurídico.',
    'privacy.section4_title': '4. Direitos do Titular de Dados (Art. 18 da LGPD)',
    'privacy.section4_desc':
      'Os titulares de dados pessoais podem exercer seus direitos previstos no art. 18 da LGPD em linguagem simples e transparente:',
    'privacy.section4_right1':
      'Confirmação e Acesso: confirmar a existência de tratamento e acessar os dados tratados;',
    'privacy.section4_right2':
      'Correção: solicitar a retificação de dados incompletos, inexatos ou desatualizados;',
    'privacy.section4_right3':
      'Anonimização, Bloqueio ou Eliminação: para dados desnecessários, excessivos ou tratados em desconformidade com a lei;',
    'privacy.section4_right4':
      'Portabilidade e Informação: receber informações claras sobre o compartilhamento de dados com entidades públicas;',
    'privacy.section4_right5':
      'Revogação do Consentimento: para hipóteses voluntárias de cadastro, respeitados os prazos legais de guarda administrativa.',
    'privacy.section5_title': '5. Retenção e Minimização de Dados',
    'privacy.section5_desc':
      'O sistema aplica o princípio da necessidade (art. 6º, III): são tratados unicamente os dados indispensáveis à instrução do processo administrativo ambiental. Os registros são mantidos pelo tempo estritamente exigido pela legislação ambiental e pelas tabelas de temporalidade de documentos públicos.',
    'privacy.section6_title': '6. Segurança da Informação e Integridade de Arquivos',
    'privacy.section6_desc':
      'A plataforma emprega medidas técnicas e administrativas aptas a proteger os dados contra acessos não autorizados:',
    'privacy.section6_item1':
      'Controle de Acesso Autenticado com perfis restritos a agentes públicos competentes;',
    'privacy.section6_item2':
      'Trilha de Auditoria detalhada que registra autoria, horário e modificações;',
    'privacy.section6_item3':
      'Indicadores de Integridade do Arquivo (hashes criptográficos SHA-256) calculados para cada mídia ou documento — sem pretensão de substituir uma cadeia de custódia formal, mas fornecendo confiabilidade técnica e auditabilidade.',
    'privacy.contact_title': 'Canal de Atendimento do Encarregado (DPO)',
    'privacy.contact_desc':
      'Para dúvidas, solicitações de direitos de titular ou notificações sobre proteção de dados, utilize o canal institucional do RastroVerde.',
    'privacy.contact_btn': 'Voltar à Fiscalização',

    // Cookie Banner
    'cookie.banner_text':
      'O RastroVerde utiliza armazenamento local (localStorage) exclusivamente para suas preferências (idioma, sessão e tour guiado). No modo de demonstração, todos os dados são fictícios e aderentes à LGPD.',
    'cookie.accept': 'Entendi',
    'cookie.learn_more': 'Saiba mais sobre LGPD',

    // Responsibility notice in decision flow
    'decision.responsibility_notice':
      'A decisão registrada é de responsabilidade do agente fiscal. O sistema apenas organiza e rastreia as informações.',
    'audit.trail_label': 'Trilha de Auditoria',
    'audit.trail_desc': 'Registro auditável de ações com autoria funcional e registro temporal.',
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
    'auth.security_notice': 'Acesso institucional com registro organizado e rastreável das ações.',
    'auth.back_to_home': 'Voltar à página inicial',
    'auth.back_to_login': 'Voltar ao login',
    'auth.demo_entry_prompt': 'Quer apenas conhecer a ferramenta?',
    'auth.demo_entry_btn': 'Ver Demonstração sem cadastro',
    'auth.password_min_length': 'Mínimo de 8 caracteres recomendando letras e números',

    // Cartão de Bolso do Pitch (Uso interno da equipe / AmazoniaHack)
    'pitch.internal_banner_badge': 'USO INTERNO DA EQUIPE',
    'pitch.internal_banner_text':
      'Material interno da equipe — não é parte da demonstração do produto.',
    'pitch.title': 'Cartão de Bolso — Pitch & Júri',
    'pitch.subtitle':
      'Guia rápido de bolso para o pitch e banca examinadora do AmazoniaHack. Consulta rápida otimizada para celular.',
    'pitch.tab_script_2min': 'Roteiro 2 min',
    'pitch.tab_script_1min': 'Pitch 1 min',
    'pitch.tab_jury': 'Perguntas do Júri',
    'pitch.tab_all': 'Visão Completa',
    'pitch.copy_all': 'Copiar roteiro',
    'pitch.copied': 'Copiado para a área de transferência!',
    'pitch.mode_pocket': 'Modo Bolso',
    'pitch.mode_expanded': 'Expandir Tudo',

    // Roteiro 2 minutos
    'pitch.2min_title': 'Roteiro de 2 Minutos — RastroVerde',
    'pitch.2min_badge': '2 MINUTOS',
    'pitch.2min_step1_time': '0:00–0:20',
    'pitch.2min_step1_label': 'Landing — O problema',
    'pitch.2min_step1_text':
      'Toda fiscalização ambiental gera o mesmo caos: fotos, áudios, coordenadas, notas de campo e documentos voltam de campo espalhados. Dias depois, alguém precisa reconstruir o que aconteceu — e transformar isso num relatório defensável. Às vezes a área está só num áudio. Às vezes só na fotografia. Às vezes duas fontes divergem. E nenhuma delas pode ser inventada.',

    'pitch.2min_step2_time': '0:20–0:35',
    'pitch.2min_step2_label': 'Proposta de valor',
    'pitch.2min_step2_text':
      'O RastroVerde organiza as evidências, extrai os fatos, verifica consistências e gera uma minuta de relatório onde cada afirmação está ligada à evidência que a sustenta. Ele não decide sozinho — sinaliza divergências e lacunas para validação humana.',

    'pitch.2min_step3_time': '0:35–0:55',
    'pitch.2min_step3_label': 'Demo — Evidências',
    'pitch.2min_step3_text':
      'Este é um caso fictício, marcado como dado de demonstração. Aqui estão as evidências separadas por tipo: o áudio de campo com o trecho aos 01:24 — de onde sai a única menção à área de 12,4 hectares — a fotografia cujo arquivo carrega a coordenada que o formulário não tem, e a caderneta, preservada exatamente como foi escrita.',

    'pitch.2min_step4_time': '0:55–1:20',
    'pitch.2min_step4_label': 'Divergência e lacunas',
    'pitch.2min_step4_text':
      'Quando duas fontes não batem — 12,3 hectares na caderneta contra 11,8 no levantamento — o sistema não escolhe por você: apresenta as duas, exige uma decisão com justificativa, e registra a origem dessa decisão na minuta. E quando algo não existe nas evidências, ele escreve "informação não localizada" — nunca preenche o vazio.',

    'pitch.2min_step5_time': '1:20–1:40',
    'pitch.2min_step5_label': 'Minuta rastreável',
    'pitch.2min_step5_text':
      'A minuta segue a estrutura normativa do município — cada secretaria pode ter o seu modelo. Repare nos chips de fontes: clicando em "3 fontes", vejo exatamente quais fotos, áudios e notas sustentam esta frase. O caminho afirmação → evidência fica visível o tempo todo.',

    'pitch.2min_step6_time': '1:40–1:55',
    'pitch.2min_step6_label': 'Revisão humana + encerramento',
    'pitch.2min_step6_text':
      'Nada é finalizado sem que uma pessoa revise: pendências, divergências e trechos de baixa confiança aparecem antes da aprovação. RastroVerde — da evidência de campo à minuta de fiscalização rastreável.',

    'pitch.2min_tip_label': 'Dica de apresentação',
    'pitch.2min_tip_text':
      'O momento mais forte é a divergência (0:55–1:20) — não acelerar ali. Se o tempo apertar, cortar a seção de Instrumentos, não a rastreabilidade.',

    // Pitch Relâmpago 1 minuto
    'pitch.1min_title': 'Pitch Relâmpago — 1 Minuto',
    'pitch.1min_badge': '1 MINUTO',
    'pitch.1min_step1_time': '0:00–0:15',
    'pitch.1min_step1_label': 'O problema',
    'pitch.1min_step1_text':
      'A evidência volta do campo em vários formatos: fotos, áudios, coordenadas, notas. Dias depois, alguém precisa reconstruir o que aconteceu e virar isso num relatório defensável. A área pode estar só num áudio. A coordenada, só na fotografia. E quando duas fontes divergem, nada pode ser inventado.',

    'pitch.1min_step2_time': '0:15–0:30',
    'pitch.1min_step2_label': 'A proposta',
    'pitch.1min_step2_text':
      'O RastroVerde transforma esse conjunto disperso numa minuta de fiscalização rastreável — onde cada afirmação está ligada à evidência que a sustenta, com um clique.',

    'pitch.1min_step3_time': '0:30–0:50',
    'pitch.1min_step3_label': 'Demo',
    'pitch.1min_step3_text':
      'Nesta minuta, clicando em "3 fontes", vejo exatamente quais fotos, áudios e notas sustentam esta frase. E aqui — o momento crítico: duas fontes, 12,3 contra 11,8 hectares. O sistema não escolhe: exige decisão humana com justificativa, registrada na minuta.',

    'pitch.1min_step4_time': '0:50–1:00',
    'pitch.1min_step4_label': 'Encerramento',
    'pitch.1min_step4_text':
      'E o que não existe nas evidências, ele escreve: "informação não localizada" — nunca preenche o vazio. RastroVerde: da evidência de campo à minuta rastreável. Humano revisa, sistema rastreia.',

    'pitch.1min_tip_label': 'Dica prática',
    'pitch.1min_tip_text':
      'Em vez de navegar ao vivo, deixar a aba Minuta já aberta numa segunda aba preparada — os 20 segundos centrais ganham o dobro de impacto.',

    // Respostas para o Júri
    'pitch.jury_title': 'Respostas para o Júri (Banca Examinadora)',
    'pitch.jury_badge': '3 PERGUNTAS-CHAVE',
    'pitch.jury_q1': 'Como vocês garantem a segurança e a integridade das evidências?',
    'pitch.jury_a1':
      'Não prometemos o que não entregamos: não usamos blockchain nem afirmamos cadeia de custódia formal. O que o RastroVerde faz hoje é três coisas concretas: cada arquivo recebe um indicador de integridade (SHA-256) que sinaliza se foi alterado; toda ação fica registrada na trilha de auditoria com autoria, data e hora; e o acesso é controlado por autenticação. A responsabilidade final é sempre do agente fiscal — o sistema organiza e rastreia, nunca decide.',

    'pitch.jury_q2':
      'Quanto custa processar uma ocorrência? Isso escala para um município pequeno?',
    'pitch.jury_a2':
      'Sendo honestos: ainda não medimos custo em produção — e preferimos dizer isso a inventar números. A arquitetura já registra método, tempo de processamento e quantidade de evidências por ocorrência, então a medição está preparada. E o design é leve de propósito: a extração roda por ocorrência, não em tempo real, então um município pequeno processa seus casos conforme a demanda, sem infraestrutura contínua pesada.',

    'pitch.jury_q3': 'Cada prefeitura faz o relatório de um jeito. Como vocês lidam com isso?',
    'pitch.jury_a3':
      'Foi por isso que a minuta não é fixa: existe uma arquitetura de modelos configuráveis por município — já entregamos perfis de exemplo para Altamira, Paragominas, Tailândia e Ulianópolis, cada um com sua estrutura. A secretaria adapta as seções ao seu padrão sem mexer no código. E como cada informação da minuta carrega a fonte de onde veio, a adaptação do modelo não quebra a rastreabilidade.',

    'pitch.jury_strategy_label': 'Nota de estratégia',
    'pitch.jury_strategy_text':
      'As três respostas seguem a mesma estratégia: admitir o limite com honestidade e mostrar imediatamente o que o sistema realmente faz. Júris de hackathon valorizam mais isso do que promessa grande.',
  },
  en: {
    // Brand & header
    'brand.name': 'RastroVerde',
    'brand.tagline':
      'From field evidence to environmental reports, with traceability and confidence.',
    'badge.demo': 'Synthetic demo data',
    'badge.fictional_demo': 'Synthetic demonstration data',
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
    'landing.headline': 'From field evidence to traceable environmental enforcement report drafts.',
    'landing.subheadline':
      'For municipal environmental secretariats and field officers: organize fragmented evidence, audit procedural gaps, and generate report drafts where every paragraph directly cites its ground-truth source.',
    'landing.start_inspection': 'Analyze occurrence',
    'landing.view_demo': 'View demo',
    'landing.enter_demo': 'Explore demo',
    'landing.btn_demo': 'Explore interactive demo case',
    'landing.how_it_works_title': 'How RastroVerde Works',
    'landing.step1_title': '1. Occurrence',
    'landing.step1_desc':
      'Recording institutional data, occurrence location, and initiation of enforcement dossier.',
    'landing.step1_highlight': 'Initial Record',
    'landing.step2_title': '2. Evidence',
    'landing.step2_desc':
      'Photos with metadata, audio notes, field notebooks, and attachments linked to the occurrence.',
    'landing.step2_highlight': 'Evidentiary Organization',
    'landing.step3_title': '3. Extraction',
    'landing.step3_desc':
      'Extraction of factual findings, coordinates, affected areas, and cited parties.',
    'landing.step3_highlight': 'Structured Facts',
    'landing.step4_title': '4. Verification',
    'landing.step4_desc':
      'Cautious cross-checking of field records, flagging potential discrepancies and gaps.',
    'landing.step4_highlight': 'Prudent Triage',
    'landing.step5_title': '5. Draft Report',
    'landing.step5_desc':
      'Violation report draft structured into 10 standardized sections tailored to municipality.',
    'landing.step5_highlight': 'Structured Draft',
    'landing.step6_title': '6. Human review',
    'landing.step6_desc':
      'Final decisions remain strictly with the officer: review, sign-off, and traceable release.',
    'landing.step6_highlight': 'Officer Sign-Off',
    'landing.folder_badge': 'Evidence must not end in a folder.',
    'landing.folder_headline': 'Evidence must not end forgotten inside an archive folder.',
    'landing.folder_desc':
      'Evidence returns from the field in disconnected formats: phone photos, audio notes, paper clipboards, and scattered coordinates. RastroVerde binds each fact to its source and answers: can we produce a legally defensible report draft demonstrating exactly what evidence supports each statement?',
    'landing.flow_field': 'Field inspection',
    'landing.flow_evidence': 'Evidence organization',
    'landing.flow_verification': 'Consistency check',
    'landing.flow_gaps': 'Gaps audit',
    'landing.flow_report': 'Traceable report',
    'landing.flow_title': 'End-to-End Operational Workflow',
    'landing.flow_subtitle':
      'Occurrence → Evidence → Extraction → Verification → Draft Report → Human review',
    'landing.problem_title': 'The actual challenge in field enforcement',
    'landing.problem_desc':
      'During environmental operations, critical data is scattered across disconnected mediums, creating administrative vulnerability and expert rework.',
    'landing.problem_sources':
      'Phone photos, paper clipboards, isolated GPS waypoints, land title registries, physical notices, and detached witness statements.',
    'landing.problem_sources_subtitle': 'Fragmented field sources lacking direct linkage',
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
    'landing.demo_step2': 'Organized repository of raw photographs, audio notes, and attachments',
    'landing.demo_step3': 'Automated cross-check validating timestamps against GNSS coordinates',
    'landing.demo_step4':
      'Structured technical report generation with direct anchors to ground sources',
    'landing.open_demo': 'Launch interactive case',
    'landing.access_block_title': 'Institutional Portal for Oversight Agencies',
    'landing.access_block_desc':
      'Secure environment for socio-environmental enforcement squads, forensic experts, and inspectors.',
    'landing.access_benefit_1': 'Organized and traceable records for field evidence',
    'landing.access_benefit_2':
      'Cautious cross-checking of timestamps and coordinates prior to release',
    'landing.access_benefit_3': 'Standardized technical reports with direct source traceability',
    'landing.btn_access_agent': 'Sign in with official credentials',
    'landing.btn_create_account': 'Request institutional account',

    // Dashboard
    'dashboard.title': 'Enforcement Overview',
    'dashboard.stat_inspections': 'Occurrences',
    'dashboard.stat_inspections_desc': 'Operations recorded in database',
    'dashboard.stat_ready_for_report': 'Ready for report',
    'dashboard.stat_ready_desc': 'Sufficient and validated evidence',
    'dashboard.stat_missing_info': 'With missing info',
    'dashboard.stat_missing_desc': 'Gaps requiring complementation',
    'dashboard.stat_divergences': 'With divergences',
    'dashboard.stat_divergences_desc': 'Discrepancy across field sources',
    'dashboard.stat_in_progress': 'In progress',
    'dashboard.stat_in_progress_desc': 'Field collection or technical analysis',
    'dashboard.stat_evidence': 'Evidence',
    'dashboard.stat_evidence_desc': 'Photos, records and linked files',
    'dashboard.stat_gaps': 'Gaps',
    'dashboard.stat_gaps_desc': 'Items requiring complementation',
    'dashboard.recent_inspections': 'Recent Inspections',
    'dashboard.recent_inspections_desc': 'Active operational dossiers and evidentiary chains',
    'dashboard.view_all': 'View all',
    'dashboard.open_inspection': 'Open inspection',
    'dashboard.pipeline_title': 'Inspection & Traceability Pipeline',
    'dashboard.pipeline_subtitle': 'Continuous end-to-end traceability',
    'dashboard.legend_title': 'Status Legend',
    'dashboard.badge_sub': 'Integrated operational control panel',
    'dashboard.tag_governance': 'Governance & Enforcement',
    'dashboard.stat_count_evidence': '{count} evidence',
    'dashboard.stat_count_review': '{count} in review',
    'dashboard.pipeline_step1': '1. Inspection',
    'dashboard.pipeline_step2': '2. Evidence',
    'dashboard.pipeline_step3': '3. Verification',
    'dashboard.pipeline_step4': '4. Gaps',
    'dashboard.pipeline_step5': '5. Report',

    // Statuses
    'status.em_coleta': 'Evidence received',
    'status.em_analise': 'Under analysis',
    'status.com_pendencias': 'Complementation required',
    'status.requer_validacao': 'Validation required',
    'status.pronta_relatorio': 'Ready for draft',
    'status.minuta_gerada': 'Draft generated',
    'status.finalizada': 'Reviewed',

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
    'workspace.tabs.extraction': 'Extracted facts',
    'workspace.tabs.timeline': 'Timeline',
    'workspace.tabs.verification': 'Verification',
    'workspace.tabs.gaps': 'Gaps & Missing Items',
    'workspace.tabs.report': 'Draft Report',
    'workspace.tabs.instruments': 'Related Instruments',
    'workspace.completeness_title': 'Inspection completeness',
    'workspace.completeness_advice': 'Before finalizing, review pending items.',
    'workspace.generate_report': 'Generate Report',
    'workspace.edit_inspection': 'Edit details',
    'workspace.change_status': 'Change status',
    'workspace.loading': 'Loading inspection data...',
    'workspace.not_found': 'Inspection not found',
    'workspace.overview_context_title': 'Context and Observed Facts',
    'workspace.overview_notes_title': 'Supplementary Team Observations:',
    'workspace.overview_no_desc': 'No initial description recorded.',
    'workspace.field_evidence_title': 'Field Collected Evidence',
    'workspace.view_all_evidence': 'View all',
    'workspace.tech_data_title': 'Technical Data',
    'workspace.tech_occurrence_type': 'Occurrence Type:',
    'workspace.tech_team': 'Responsible Team:',
    'workspace.tech_team_unspecified': 'Not specified',
    'workspace.tech_coords': 'Reference Coordinates:',
    'workspace.quick_alert_title': 'Attention: 3 Gaps and 1 Inconsistency',
    'workspace.quick_alert_desc':
      'System identified potential coordinate variances and missing land title records.',
    'workspace.quick_alert_action': 'Check Case Integrity',
    'workspace.verification_card_desc':
      'Access the dedicated panel to review detailed cross-checks of timestamps, GPS coordinates, and automatically detected inconsistencies with supportive posture.',
    'workspace.verification_card_btn': 'Open Full Verification Panel',
    'workspace.gaps_card_desc':
      'Review the list of technical and documentary requirements needed before final forensic report generation.',
    'workspace.gaps_card_btn': 'Open Gaps Checklist',
    'workspace.report_card_desc':
      'Preliminary technical report with ground-truth foundations and bidirectional evidentiary traceability back to recorded evidence.',
    'workspace.report_card_btn': 'Open Report Generator',
    'workspace.add_evidence': 'Add Evidence',
    'workspace.status_updated': 'Status updated to: {status}',
    'workspace.status_update_error': 'Failed to update status',
    'workspace.timeline_actor': 'by {actor}',
    'workspace.timeline_view_linked': 'View linked evidence',
    'workspace.evidence_field_photo': 'Field Photographic Record',
    'workspace.attached_video': 'Attached video',
    'workspace.attached_audio': 'Recorded audio',
    'workspace.open_document': 'Open document',
    'workspace.unidentified_officer_warning': '⚠ Officer not identified (Gap)',
    'workspace.category_filter_title': 'Analysis Categories:',
    'workspace.integrity_status_title': 'Inspection Integrity Status',
    'workspace.items_fulfilled': '{completed} of {total} requirements met',
    'workspace.item_validated': 'Validated',

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
    'verification.posture_title': 'Platform Supportive and Cautious Posture',
    'verification.cautious_detail':
      'Phrasings like "Potential inconsistency", "Recommended to verify" and "Information not located" support technical prudence.',
    'verification.rec_title': 'Technical recommendation:',
    'verification.ref_prefix': 'Ref:',
    'verification.rerun': 'Re-run verification',
    'verification.consistent': 'Consistent',
    'verification.review': 'Review',
    'verification.conflict': 'Conflict',
    'verification.missing': 'Missing information',
    'verification.cautious_notice':
      'The system never states crime or culpability. Analyses are supportive suggestions for the competent officer.',
    'verification.go_to_evidence': 'View related evidence',
    'verification.toast_done_title': 'Consistency verification completed',
    'verification.toast_done_desc':
      'All field logs have been cross-checked and recalculated against the database.',

    // Gaps
    'gaps.title': 'What is still missing?',
    'gaps.subtitle':
      'Smart checklist verifying inspection integrity before issuing the violation report.',
    'gaps.go_to_report': 'Proceed to Report Generation',
    'gaps.toast_validated': 'Item already audited and validated.',
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
      'RastroVerde is a tool supporting the drafting of environmental inspection reports that organizes field evidence, identifies gaps, and keeps every statement in the draft report anchored to the evidence that supports it.',
    'about.team_title': 'Development Team',
    'about.differentials_title': 'Platform Differentials',
    'about.diff_1': 'End-to-end traceability from raw field evidence to each line of the report.',
    'about.diff_2':
      'Smart time and coordinate consistency checks with strictly supportive language.',
    'about.diff_3':
      'Automated gaps checklist that flags pending requirements before finalizing the report.',
    'about.privacy_link': 'Privacy Policy & LGPD Compliance',

    // LGPD & Privacy
    'privacy.title': 'Privacy & Data Protection (LGPD)',
    'privacy.subtitle':
      'Commitment to the Brazilian General Data Protection Law (Federal Law No. 13,709/2018) in environmental enforcement.',
    'privacy.fictional_demo_notice_title': 'Demonstration Environment — Strictly Fictional Data',
    'privacy.fictional_demo_notice_desc':
      'For the purposes of AmazoniaHack and public demonstration (case RV-DEMO-001), all officer names, cited individuals, geographical coordinates, case numbers, and files are synthetic and designed exclusively for technical demonstration.',
    'privacy.section1_title': '1. Which Data the System Processes',
    'privacy.section1_desc':
      'RastroVerde operates within the evidentiary instruction of municipal and state environmental enforcement. Processing includes:',
    'privacy.section1_item1':
      'Official records of public officers: full name, institutional email, rank, and official badge identifier;',
    'privacy.section1_item2':
      'Environmental occurrence data: names of cited parties, representatives, or occupants when formally recorded;',
    'privacy.section1_item3':
      'Tax identification documents (CPF/CNPJ) and rural registry codes (CAR number), strictly when existing and attached to the proceedings;',
    'privacy.section1_item4':
      'Georeferenced field evidence: technical photographs, timestamped audio notes, inspection videos, field clipboard records, and GNSS coordinates (SIRGAS 2000).',
    'privacy.section2_title': '2. Legal Basis for Processing (Arts. 7 and 23 of LGPD)',
    'privacy.section2_desc':
      'Personal data processing within RastroVerde is strictly grounded in Brazilian Law No. 13,709/2018:',
    'privacy.section2_item1':
      'Public Policy Execution (Art. 7, III and Art. 23): pursuing the public interest in conducting administrative environmental proceedings;',
    'privacy.section2_item2':
      'Regular Exercise of Statutory Powers: fulfilling legal and regulatory duties assigned to SISNAMA enforcement bodies;',
    'privacy.section2_item3':
      'Voluntary User Accounts (Art. 7, I): for institutional officer sign-ups and browsing preferences, based on explicit consent and terms of service.',
    'privacy.section3_title': '3. System Role: Strict Human Decision Support',
    'privacy.section3_desc':
      'In full compliance with Article 20 of the LGPD and responsible public governance principles:',
    'privacy.section3_highlight':
      'There is no automated decision-making affecting data subjects. RastroVerde functions solely and strictly as technical assistance for evidentiary structuring.',
    'privacy.section3_subdesc':
      'Every draft qualification, divergence alert, and report draft requires mandatory human review, validation, and sign-off by the authorized enforcement officer before producing any legal consequence.',
    'privacy.section4_title': '4. Data Subject Rights (Art. 18 of LGPD)',
    'privacy.section4_desc':
      'Data subjects can exercise their rights under Article 18 of the LGPD in clear and transparent language:',
    'privacy.section4_right1':
      'Confirmation and Access: confirm data processing existence and access personal records;',
    'privacy.section4_right2':
      'Correction: request correction of incomplete, inaccurate, or outdated data;',
    'privacy.section4_right3':
      'Anonymization, Blocking, or Deletion: for unnecessary, excessive, or unlawfully processed data;',
    'privacy.section4_right4':
      'Portability and Information: obtain clear disclosure regarding public entities with whom data is shared;',
    'privacy.section4_right5':
      'Consent Revocation: applicable to voluntary registrations, respecting statutory records retention periods.',
    'privacy.section5_title': '5. Retention and Data Minimization',
    'privacy.section5_desc':
      'The platform applies the necessity principle (Art. 6, III): only data essential to environmental administrative proceedings is processed. Records are retained strictly for the duration established by public archives and environmental legislation.',
    'privacy.section6_title': '6. Information Security and File Integrity',
    'privacy.section6_desc':
      'The platform implements technical and administrative safeguards to protect data from unauthorized access:',
    'privacy.section6_item1':
      'Authenticated Access Control with strict role-based permissions for authorized public officers;',
    'privacy.section6_item2':
      'Detailed Audit Trail recording author, timestamp, and modification events;',
    'privacy.section6_item3':
      'File Integrity Indicators (SHA-256 cryptographic hashes) computed for each media item or document — not claiming to be a formal custody chain, but providing technical auditability.',
    'privacy.contact_title': 'Data Protection Officer (DPO) Contact',
    'privacy.contact_desc':
      'For inquiries, data subject right requests, or data protection notices, reach out through the institutional RastroVerde channel.',
    'privacy.contact_btn': 'Return to Inspection',

    // Cookie Banner
    'cookie.banner_text':
      'RastroVerde uses local storage (localStorage) exclusively for your preferences (language, session, and guided tour). In demo mode, all data is fictional and fully LGPD-compliant.',
    'cookie.accept': 'Understood',
    'cookie.learn_more': 'Learn more about LGPD',

    // Responsibility notice in decision flow
    'decision.responsibility_notice':
      'The recorded decision is the enforcement officer’s responsibility. The system only organizes and traces information.',
    'audit.trail_label': 'Audit Trail',
    'audit.trail_desc':
      'Auditable log of actions with officer attribution and chronological timestamp.',
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
    'auth.security_notice': 'Institutional access with organized and traceable action logs.',
    'auth.back_to_home': 'Back to home',
    'auth.back_to_login': 'Back to sign in',
    'auth.demo_entry_prompt': 'Just exploring the platform?',
    'auth.demo_entry_btn': 'View Demo without signing up',
    'auth.password_min_length': 'Minimum 8 characters with letters and numbers recommended',

    // Pitch Pocket Card (Internal Team / AmazoniaHack)
    'pitch.internal_banner_badge': 'INTERNAL TEAM USE ONLY',
    'pitch.internal_banner_text': 'Internal team material — not part of the product demonstration.',
    'pitch.title': 'Pocket Card — Pitch & Jury Q&A',
    'pitch.subtitle':
      'Quick pocket reference guide for the AmazoniaHack pitch and judging panel. Mobile-optimized for quick backstage consultation.',
    'pitch.tab_script_2min': '2-Min Script',
    'pitch.tab_script_1min': '1-Min Pitch',
    'pitch.tab_jury': 'Jury Q&A',
    'pitch.tab_all': 'Full View',
    'pitch.copy_all': 'Copy script',
    'pitch.copied': 'Copied to clipboard!',
    'pitch.mode_pocket': 'Pocket Mode',
    'pitch.mode_expanded': 'Expand All',

    // 2-Minute Script
    'pitch.2min_title': '2-Minute Script — RastroVerde',
    'pitch.2min_badge': '2 MINUTES',
    'pitch.2min_step1_time': '0:00–0:20',
    'pitch.2min_step1_label': 'Landing — The Problem',
    'pitch.2min_step1_text':
      'Every environmental inspection generates the same chaos: photos, audio notes, coordinates, field notebooks, and paper documents come back scattered. Days later, someone has to reconstruct what happened — and turn it into a legally defensible report. Sometimes the area measurement exists only in an audio clip. Sometimes only in a photo. Sometimes two sources conflict. And none of them can ever be fabricated.',

    'pitch.2min_step2_time': '0:20–0:35',
    'pitch.2min_step2_label': 'Value Proposition',
    'pitch.2min_step2_text':
      'RastroVerde organizes the evidence, extracts the facts, checks consistency, and generates a draft report where every statement is directly linked to the evidence supporting it. It never decides on its own — it highlights divergences and evidentiary gaps for human sign-off.',

    'pitch.2min_step3_time': '0:35–0:55',
    'pitch.2min_step3_label': 'Demo — Evidence',
    'pitch.2min_step3_text':
      'This is a fictional case, flagged as synthetic demonstration data. Here is the evidence organized by type: the field audio recording at 01:24 — the sole reference to the 12.4-hectare affected area — the field photograph whose metadata carries the coordinate missing from the paper form, and the field notebook, preserved exactly as written.',

    'pitch.2min_step4_time': '0:55–1:20',
    'pitch.2min_step4_label': 'Divergence & Gaps',
    'pitch.2min_step4_text':
      'When two sources conflict — 12.3 hectares in the notebook versus 11.8 in the survey — the system never chooses for you: it displays both, mandates an officer decision with reasoning, and records that decision origin directly in the report draft. And whenever an item is absent from the evidence, it writes "information not located" — it never fills in the blanks.',

    'pitch.2min_step5_time': '1:20–1:40',
    'pitch.2min_step5_label': 'Traceable Draft Report',
    'pitch.2min_step5_text':
      'The draft adheres to the municipal regulatory template — each environmental department can configure its own standard. Notice the source chips: clicking "3 sources" reveals exactly which photos, audio clips, and field notes substantiate this statement. The statement → evidence path stays visible at all times.',

    'pitch.2min_step6_time': '1:40–1:55',
    'pitch.2min_step6_label': 'Human Review & Closing',
    'pitch.2min_step6_text':
      'Nothing is finalized without human review: outstanding items, conflicting data, and low-confidence passages are surfaced before final approval. RastroVerde — from field evidence to traceable inspection reports.',

    'pitch.2min_tip_label': 'Delivery tip',
    'pitch.2min_tip_text':
      'The strongest moment is the divergence (0:55–1:20) — do not rush there. If running out of time, cut the Instruments section, never the traceability.',

    // 1-Minute Lightning Pitch
    'pitch.1min_title': 'Lightning Pitch — 1 Minute',
    'pitch.1min_badge': '1 MINUTE',
    'pitch.1min_step1_time': '0:00–0:15',
    'pitch.1min_step1_label': 'The Problem',
    'pitch.1min_step1_text':
      'Evidence returns from the field in disconnected formats: photos, audio notes, coordinates, clipboards. Days later, someone has to reconstruct what happened and turn it into a defensible report. The area may only be in an audio note. The coordinate, only in a photograph. And when two sources diverge, nothing can be made up.',

    'pitch.1min_step2_time': '0:15–0:30',
    'pitch.1min_step2_label': 'The Proposal',
    'pitch.1min_step2_text':
      'RastroVerde turns that scattered pile into a traceable inspection draft — where every statement is anchored to the evidence supporting it, in just one click.',

    'pitch.1min_step3_time': '0:30–0:50',
    'pitch.1min_step3_label': 'Demo',
    'pitch.1min_step3_text':
      'In this draft report, clicking "3 sources" shows exactly which photos, audios, and notes back up this sentence. And here — the critical moment: two sources, 12.3 vs 11.8 hectares. The system does not choose: it demands a human decision with reasoning, recorded in the draft.',

    'pitch.1min_step4_time': '0:50–1:00',
    'pitch.1min_step4_label': 'Closing',
    'pitch.1min_step4_text':
      'And for whatever is missing in the evidence, it writes: "information not located" — never inventing data. RastroVerde: from field evidence to traceable report draft. Human reviews, system traces.',

    'pitch.1min_tip_label': 'Practical tip',
    'pitch.1min_tip_text':
      'Instead of live menu clicking, keep the Draft Report tab already loaded in a prepared second browser tab — the 20 middle seconds will carry twice the impact.',

    // Jury Answers
    'pitch.jury_title': 'Answers for the Jury (Judges Panel)',
    'pitch.jury_badge': '3 KEY QUESTIONS',
    'pitch.jury_q1': 'How do you ensure the security and integrity of the evidence?',
    'pitch.jury_a1':
      'We do not promise what we do not deliver: we do not use blockchain nor claim a formal custody chain. What RastroVerde does today consists of three concrete pillars: each file receives an integrity hash (SHA-256) flagging whether it was modified; every action is recorded in the audit trail with officer attribution, date, and timestamp; and access is controlled via authentication. Ultimate responsibility always rests with the enforcement officer — the system organizes and traces, never decides.',

    'pitch.jury_q2':
      'How much does it cost to process an occurrence? Does this scale for a small municipality?',
    'pitch.jury_a2':
      'Being honest: we have not yet measured production costs — and we prefer saying that over inventing figures. The architecture already logs method, processing time, and evidence volume per occurrence, so measurement is built in. And the design is intentionally lightweight: extraction runs per occurrence on demand, not in real time, so a small municipality processes cases as they happen, without heavy continuous infrastructure.',

    'pitch.jury_q3': 'Every city council structures reports differently. How do you handle that?',
    'pitch.jury_a3':
      'That is precisely why the report draft is not hardcoded: there is a configurable municipality template architecture — we already provide sample profiles for Altamira, Paragominas, Tailândia, and Ulianópolis, each with its own structure. The local secretariat adapts sections to its standard without code changes. And because every draft item carries the origin source it came from, tailoring the template never breaks traceability.',

    'pitch.jury_strategy_label': 'Strategy note',
    'pitch.jury_strategy_text':
      'All three answers share the exact same strategy: acknowledge the boundary honestly and immediately showcase what the system actually does. Hackathon judges value that far more than overpromising.',
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
