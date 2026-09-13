import {
  ExtractedFact,
  DivergenceItem,
  MissingInformationItem,
  FieldNoteItem,
  AudioEvidenceItem,
  DocumentInstrument,
  InstrumentConsistencyCheck,
  DraftSection,
  MunicipalityTemplate,
  CostProcessingMetrics,
} from './draftReportTypes'

/**
 * Templates Municipais configuráveis (Altamira, Paragominas, Tailândia, Ulianópolis)
 * Evita hardcode e atende ao requisito 7 do desafio.
 */
export const MUNICIPALITY_TEMPLATES: Record<string, MunicipalityTemplate> = {
  altamira: {
    id: 'altamira',
    name: 'Altamira',
    state: 'PA',
    organName: 'Secretaria Municipal de Meio Ambiente de Altamira (SEMMAT)',
    normativeBase: 'Lei Municipal nº 2.890/2019 e Lei Federal nº 9.605/1998',
    headerCode: 'SEMMAT-ALTM-REL-2026',
    requiredSections: [
      '1. Identificação',
      '2. Identificação do imóvel e das partes',
      '3. Contexto da fiscalização',
      '4. Descrição dos fatos',
      '5. Localização e delimitação',
      '6. Evidências coletadas',
      '7. Enquadramento',
      '8. Instrumentos lavrados',
      '9. Anexos',
      '10. Pendências e ressalvas',
    ],
    specificFields: [
      {
        label: 'Zona Rural / Distrito',
        instruction: 'Informar distrito (ex.: Castelo dos Sonhos, Cachoeira da Serra)',
      },
      { label: 'Bacia Hidrográfica', instruction: 'Identificar sub-bacia do Rio Xingu afetada' },
    ],
  },
  paragominas: {
    id: 'paragominas',
    name: 'Paragominas',
    state: 'PA',
    organName: 'Secretaria Municipal de Meio Ambiente de Paragominas (SEMMA-PGM)',
    normativeBase: 'Código Florestal e Plano Diretor Sustentável do Município Verde',
    headerCode: 'SEMMA-PGM-REL-2026',
    requiredSections: [
      '1. Identificação',
      '2. Identificação do imóvel e das partes',
      '3. Contexto da fiscalização',
      '4. Descrição dos fatos',
      '5. Localização e delimitação',
      '6. Evidências coletadas',
      '7. Enquadramento',
      '8. Instrumentos lavrados',
      '9. Anexos',
      '10. Pendências e ressalvas',
    ],
    specificFields: [
      {
        label: 'Pacto Município Verde',
        instruction: 'Verificar adesão do imóvel ao pacto local de combate ao desmatamento',
      },
      { label: 'Status no CAR Municipal', instruction: 'Consultar base do CAR Pará' },
    ],
  },
  tailandia: {
    id: 'tailandia',
    name: 'Tailândia',
    state: 'PA',
    organName: 'Secretaria Municipal de Meio Ambiente e Sustentabilidade de Tailândia (SEMAS-TLD)',
    normativeBase: 'Lei Complementar Municipal nº 045/2017 e Decreto Estadual nº 2.741/2022',
    headerCode: 'SEMAS-TLD-REL-2026',
    requiredSections: [
      '1. Identificação',
      '2. Identificação do imóvel e das partes',
      '3. Contexto da fiscalização',
      '4. Descrição dos fatos',
      '5. Localização e delimitação',
      '6. Evidências coletadas',
      '7. Enquadramento',
      '8. Instrumentos lavrados',
      '9. Anexos',
      '10. Pendências e ressalvas',
    ],
    specificFields: [
      { label: 'Acesso Rodoviário', instruction: 'Indicar vicinal a partir da rodovia PA-150' },
      {
        label: 'Tipo de Manejo Florestal ou Conversão',
        instruction: 'Registrar se há indício de carvoaria ou dendeicultura',
      },
    ],
  },
  ulianopolis: {
    id: 'ulianopolis',
    name: 'Ulianópolis',
    state: 'PA',
    organName: 'Secretaria de Meio Ambiente de Ulianópolis (SEMA-ULI)',
    normativeBase: 'Legislação Ambiental Municipal nº 182/2016 e Resolução COEMA nº 120/2015',
    headerCode: 'SEMA-ULI-REL-2026',
    requiredSections: [
      '1. Identificação',
      '2. Identificação do imóvel e das partes',
      '3. Contexto da fiscalização',
      '4. Descrição dos fatos',
      '5. Localização e delimitação',
      '6. Evidências coletadas',
      '7. Enquadramento',
      '8. Instrumentos lavrados',
      '9. Anexos',
      '10. Pendências e ressalvas',
    ],
    specificFields: [
      {
        label: 'Distância da BR-010 (Belém-Brasília)',
        instruction: 'Registrar quilometragem e via de penetração',
      },
      {
        label: 'Topografia do Talhão',
        instruction: 'Classificar se plano ou de declividade acentuada',
      },
    ],
  },
}

/**
 * Cenários de Teste Essenciais (A, B, C, D) estritamente representados:
 * (A) Área 12,4 ha encontrada APENAS no áudio audio_campo_03.mp3 (01:24)
 * (B) Coordenada encontrada APENAS na fotografia foto_07.jpg (Exif) - formulário sem coordenada
 * (C) Duas fontes divergem na área: notas de campo indicam 12,3 ha; medição posterior indica 11,8 ha -> bloco "Divergência encontrada"
 * (D) Informação não existente (CPF/CNPJ do responsável, número do CAR formal) -> "Informação não localizada nas evidências fornecidas."
 */

export const DEMO_AUDIO_EVIDENCE: AudioEvidenceItem = {
  id: 'audio-03',
  code: 'audio_campo_03.mp3',
  filename: 'audio_campo_03.mp3',
  duration: '03:42',
  recordedAt: '12/09/2026 10:14',
  recordedBy: 'Agente 01 — Léo',
  transcription:
    'Aqui fala o agente Léo, equipe tática setor norte. Chegamos na borda leste da clareira aberta. O operador do trator não foi localizado no momento, apenas rastros de esteira recente no barro. Fizemos a verificação com trena eletrônica e passo calibrado: a área medida ficou em aproximadamente 12,4 hectares de corte raso de castanheira e ipê. Repito, doze vírgula quatro hectares. A madeira de lei foi empilhada próxima ao leito do igarapé.',
  relevantSnippets: [
    {
      timestamp: '01:24',
      snippet:
        '…a área medida ficou em aproximadamente 12,4 hectares de corte raso de castanheira e ipê…',
      associatedFact: 'Área afetada: 12,4 ha',
      confidence: 'Alta',
    },
    {
      timestamp: '02:05',
      snippet: '…madeira de lei foi empilhada próxima ao leito do igarapé…',
      associatedFact: 'Intervenção em Área de Preservação Permanente (APP)',
      confidence: 'Alta',
    },
    {
      timestamp: '00:32',
      snippet: '…operador do trator não foi localizado no momento, apenas rastros de esteira…',
      associatedFact: 'Responsável direto não identificado no ato da constatação',
      confidence: 'Média',
    },
  ],
  audioUrl: undefined,
  fileIntegrityIndicator:
    'SHA256: 4e8b91c0a37e192f170b4c82b130e54d1931a789efc44f91e4a66bc28c031ef8',
}

export const DEMO_FIELD_NOTES: FieldNoteItem = {
  id: 'notes-01',
  code: 'field-notes.md',
  timestamp: '12/09/2026 15:20',
  author: 'Agente 03 — Jhay',
  // Preserva erros de digitação e termos de campo exatamente como anotados
  originalText:
    'Vistoria talhao 2 APA setor Norte. Encontrado clareira com moto-serra toco fresco de castanheira. area estimada nas notas: 12,3 ha. Trator esteira passou faz uns 2 dias. Trablhador na porteira falou q veio de fora ma nao sabe o nome do patrão. Coordenada gps marco entradada: -8.0015, -34.0042.',
  structuredInterpretation:
    'Supressão recente de espécimes protegidos (Castanheira) por uso de motosserra. Área estimada preliminarmente em 12,3 ha pelo agente nas anotações de prancheta. Vestígio de trator de esteira. Ausência de identificação do mandante. Coordenada de entrada registrada: Lat -8.0015, Long -34.0042.',
}

export const DEMO_EXTRACTED_FACTS: ExtractedFact[] = [
  // Categoria Identificação
  {
    id: 'fact-id-01',
    category: 'Identificação',
    fieldKey: 'municipio',
    label: 'Município',
    value: 'Altamira',
    formattedValue: 'Altamira / PA',
    references: [
      {
        evidenceCode: 'field-notes.md',
        evidenceType: 'Anotação',
        locationWithinEvidence: 'Linha 1',
        derivedSnippet: 'Vistoria talhao 2 APA setor Norte',
        confidence: 'Alta',
        capturedAt: '12/09/2026 15:20',
        recordedBy: 'Agente 03 — Jhay',
      },
      {
        evidenceCode: 'EVD-022 (Auto de Constatação)',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Cabeçalho / Comarca',
        derivedSnippet: 'Comarca de Altamira - PA',
        confidence: 'Alta',
        capturedAt: '12/09/2026 16:00',
        recordedBy: 'Agente 01 — Léo',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
  },
  {
    id: 'fact-id-02',
    category: 'Identificação',
    fieldKey: 'imovel',
    label: 'Nome do Imóvel / Gleba',
    value: 'Área de Proteção Ambiental — Gleba Castanhal',
    references: [
      {
        evidenceCode: 'EVD-022 (Auto de Constatação)',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Item 2 - Localização',
        derivedSnippet: 'Gleba Castanhal, Setor Norte',
        confidence: 'Alta',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
  },
  {
    id: 'fact-id-03',
    category: 'Identificação',
    fieldKey: 'car',
    label: 'Cadastro Ambiental Rural (CAR)',
    value: 'Informação não localizada nas evidências fornecidas.',
    references: [
      {
        evidenceCode: 'EVD-017 (DOC-003)',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Item 3 - Notificação formal',
        derivedSnippet:
          'Notificação emitida assinalando prazo de 10 dias para apresentação de recibo do CAR ou título de posse',
        confidence: 'Baixa',
      },
    ],
    confidence: 'Baixa',
    status: 'Ausente',
    notes: 'O sistema nunca inventa número de CAR. Ocupante notificado, documento pendente.',
  },
  {
    id: 'fact-id-04',
    category: 'Identificação',
    fieldKey: 'autuado',
    label: 'Pessoa Autuada / Responsável Identificado',
    value: 'Informação não localizada nas evidências fornecidas.',
    references: [
      {
        evidenceCode: 'EVD-021 (Depoimento)',
        evidenceType: 'Depoimento',
        locationWithinEvidence: '09:33 - Registro verbal',
        derivedSnippet:
          'Trabalhador informou que tratores operaram sob ordem de terceiro não localizado',
        confidence: 'Baixa',
      },
    ],
    confidence: 'Baixa',
    status: 'Ausente',
    notes: 'Nenhum CPF/CNPJ ou titular nominado foi comprovado em campo até o momento.',
  },
  {
    id: 'fact-id-05',
    category: 'Identificação',
    fieldKey: 'testemunhas',
    label: 'Testemunhas / Ocupantes ouvidos',
    value:
      'Trabalhador rural temporário encontrado na porteira de acesso (qualificação incompleta).',
    references: [
      {
        evidenceCode: 'EVD-021 (Depoimento)',
        evidenceType: 'Depoimento',
        locationWithinEvidence: 'Declaração informal',
        derivedSnippet: 'Informou que tratores operaram na gleba nos últimos quatro dias',
        confidence: 'Média',
      },
    ],
    confidence: 'Média',
    status: 'Requer revisão',
  },

  // Categoria Ocorrência
  {
    id: 'fact-occ-01',
    category: 'Ocorrência',
    fieldKey: 'data_horario',
    label: 'Data e Horário da Constatação',
    value: '12/09/2026 entre 08:30 e 16:30',
    references: [
      {
        evidenceCode: 'EVD-020 (Marco de entrada)',
        evidenceType: 'Localização',
        locationWithinEvidence: 'Carimbo 09:05',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'EVD-026 (Marco de fechamento)',
        evidenceType: 'Localização',
        locationWithinEvidence: 'Carimbo 16:30',
        confidence: 'Alta',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
  },
  {
    id: 'fact-occ-02',
    category: 'Ocorrência',
    fieldKey: 'descricao_fatos',
    label: 'Descrição dos Fatos Constatados',
    value:
      'Supressão de vegetação nativa com abertura de clareira em corte raso, presença de marcas de trator de lâmina recente no solo argiloso e toras de espécies protegidas (Castanheira e Ipê) empilhadas próximas a leito d’água.',
    references: [
      {
        evidenceCode: 'EVD-014 (foto_07.jpg)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Visualização da clareira',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'EVD-015 (foto_05.jpg)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Marcas de esteira no solo',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'EVD-016 (foto_03.jpg)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Toras empilhadas',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'audio_campo_03.mp3',
        evidenceType: 'Áudio',
        locationWithinEvidence: '01:24',
        derivedSnippet: '…área medida ficou em aproximadamente 12,4 hectares de corte raso…',
        confidence: 'Alta',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
  },

  // Categoria Geografia
  // CENÁRIO (B): Coordenada obtida APENAS na foto foto_07.jpg (Exif)
  {
    id: 'fact-geo-01',
    category: 'Geografia',
    fieldKey: 'coordenadas_afetada',
    label: 'Coordenadas da Área Afetada',
    value: 'Latitude -8.001500, Longitude -34.004200 (SIRGAS 2000)',
    references: [
      {
        evidenceCode: 'EVD-014 (foto_07.jpg)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Metadados EXIF GPS: Lat -8.0015, Long -34.0042',
        derivedSnippet:
          'Coordenada extraída diretamente do sensor fotográfico de campo (foto_07.jpg)',
        confidence: 'Alta',
        capturedAt: '12/09/2026 14:32',
        fileIntegrityIndicator:
          'SHA256: 9b2d88a10ef4129b0f4a8112c30089e134b9d0fa72c388274a58e1c667a42410',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
    notes:
      'Cenário B atendido: formulário original não possuía coordenada exata; a coordenada foi extraída com precisão dos metadados da fotografia foto_07.jpg.',
  },

  // CENÁRIO (A) e CENÁRIO (C): Área afetada e Divergência encontrada
  {
    id: 'fact-geo-02',
    category: 'Geografia',
    fieldKey: 'area_afetada',
    label: 'Área Afetada (ha)',
    value:
      '12,4 ha (estimativa verbal de áudio) / 12,3 ha (notas de campo) / 11,8 ha (medição vetorial)',
    formattedValue: '12,4 ha (Áudio) | 12,3 ha (Notas) | 11,8 ha (Medição)',
    references: [
      {
        evidenceCode: 'audio_campo_03.mp3',
        evidenceType: 'Áudio',
        locationWithinEvidence: '01:24',
        derivedSnippet: '…a área medida ficou em aproximadamente 12,4 hectares…',
        confidence: 'Alta',
        capturedAt: '12/09/2026 10:14',
      },
      {
        evidenceCode: 'field-notes.md',
        evidenceType: 'Anotação',
        locationWithinEvidence: 'Linha 2',
        derivedSnippet: 'area estimada nas notas: 12,3 ha',
        confidence: 'Média',
        capturedAt: '12/09/2026 15:20',
      },
      {
        evidenceCode: 'EVD-023 (Sobrevoo Drone)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Ortomosaico / Ortofoto',
        derivedSnippet: 'Área medida posteriormente em geoprocessamento: 11,8 ha',
        confidence: 'Alta',
        capturedAt: '12/09/2026 16:15',
      },
    ],
    confidence: 'Média',
    status: 'Divergência',
    divergenceId: 'div-area-01',
    notes:
      'Cenário C atendido: fontes divergem. O sistema não escolhe silenciosamente; exige validação humana.',
  },

  // Categoria Infração
  {
    id: 'fact-inf-01',
    category: 'Infração',
    fieldKey: 'enquadramento_legal',
    label: 'Enquadramento Legal Preliminar',
    value: 'Art. 50 e Art. 38-A da Lei Federal nº 9.605/1998 (Crimes Ambientais)',
    references: [
      {
        evidenceCode: 'EVD-022 (Auto de Constatação)',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Campo 4 - Dispositivos violados',
        derivedSnippet:
          'Destruição ou dano a floresta de preservação permanente e corte de espécies especialmente protegidas',
        confidence: 'Alta',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
  },
  {
    id: 'fact-inf-02',
    category: 'Infração',
    fieldKey: 'agravantes',
    label: 'Circunstâncias Agravantes Sugeridas',
    value:
      'Supressão em Unidade de Conservação (APA) e intervenção em Área de Preservação Permanente (APP de igarapé).',
    references: [
      {
        evidenceCode: 'EVD-016 (Troncos na margem)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Margem do curso d’água',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'EVD-025 (Vídeo de assoreamento)',
        evidenceType: 'Vídeo',
        locationWithinEvidence: 'Trecho 00:45',
        confidence: 'Alta',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
  },

  // Categoria Instrumentos
  {
    id: 'fact-inst-01',
    category: 'Instrumentos',
    fieldKey: 'auto_constatacao',
    label: 'Auto de Constatação',
    value: 'Auto de Constatação nº 00324 lavrado em 12/09/2026',
    references: [
      {
        evidenceCode: 'EVD-022',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Documento físico digitalizado nº 00324',
        confidence: 'Alta',
      },
    ],
    confidence: 'Alta',
    status: 'Confirmado',
  },
  {
    id: 'fact-inst-02',
    category: 'Instrumentos',
    fieldKey: 'auto_infracao',
    label: 'Auto de Infração Ambiental (AIA)',
    value: 'AIA nº 00324 em fase de instrução técnica',
    references: [
      {
        evidenceCode: 'EVD-022',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Referência cruzada',
        confidence: 'Média',
      },
    ],
    confidence: 'Média',
    status: 'Requer revisão',
  },
]

export const DEMO_DIVERGENCES: DivergenceItem[] = [
  {
    id: 'div-area-01',
    field: 'area_afetada',
    fieldLabel: 'Área afetada pela supressão',
    sourceA: {
      source: 'field-notes.md (Anotação de campo)',
      type: 'Anotação',
      value: '12,3 ha',
      location: 'Linha 2: "area estimada nas notas: 12,3 ha"',
    },
    sourceB: {
      source: 'drone_ortomosaico_01.tif (Medição posterior)',
      type: 'Fotografia / Geoprocessamento',
      value: '11,8 ha',
      location: 'Poligonal vetorial calculada em gabinete (11,82 ha)',
    },
    status: 'requer validação humana',
    selectedSource: undefined,
    selectedExplanation: undefined,
  },
  {
    id: 'div-instrument-number',
    field: 'numero_auto_embargo',
    fieldLabel: 'Citação do Auto de Infração no Termo de Embargo',
    sourceA: {
      source: 'Auto de Constatação / Ocorrência',
      type: 'Documento nº 00324',
      value: 'Auto nº 00324',
      location: 'EVD-022 — Campo número do instrumento',
    },
    sourceB: {
      source: 'Termo de Embargo e Interdição',
      type: 'Documento TE-2026/09',
      value: 'Auto nº 00342',
      location: 'Cláusula de vinculação: "decorrente do Auto de Infração nº 00342"',
    },
    status: 'requer validação humana',
    selectedSource: undefined,
    selectedExplanation:
      'Termo de Embargo cita Auto de Infração nº 00342, porém o Auto identificado na ocorrência é nº 00324. O sistema não altera silenciosamente o número.',
  },
]

export const DEMO_MISSING_INFO: MissingInformationItem[] = [
  {
    id: 'missing-01',
    title: 'Número do Cadastro Ambiental Rural (CAR) não localizado',
    description: 'Nenhum recibo de CAR foi apresentado durante a vistoria ou anexado pela equipe.',
    category: 'crítico',
    impactOnReport:
      'Impede a verificação de sobreposição com terras públicas e a individualização dominial.',
    fieldGuidance:
      'Solicitar via notificação oficial ao proprietário ou consultar base Sicar/PA antes de encerrar o relatório.',
    resolved: false,
  },
  {
    id: 'missing-02',
    title: 'Qualificação do Responsável / Infrator Incompleta',
    description:
      'Não constam nos autos CPF/CNPJ, nome completo ou domicílio do responsável direto pela contratação do maquinário.',
    category: 'crítico',
    impactOnReport: 'Vulnerabilidade do auto de infração quanto à autoria subjetiva da conduta.',
    fieldGuidance:
      'Coletar qualificação do proprietário da terra ou requisitar dados do operador com testemunhas locais.',
    resolved: false,
  },
  {
    id: 'missing-03',
    title: 'Agente fiscal ausente no registro da evidência EVD-008',
    description:
      'Anotação referente a toco com motosserra não contém o nome do fiscal que realizou o registro.',
    category: 'importante',
    impactOnReport:
      'Possível impugnação da prova técnica por ausência de assinatura funcional na caderneta.',
    fieldGuidance:
      'Conferir com os agentes presentes na viatura e atribuir a autoria técnica do registro.',
    resolved: false,
  },
  {
    id: 'missing-04',
    title: 'Shapefile vetorial definitivo da poligonal de supressão',
    description:
      'Constam apenas pontos de marco e fotos com estimativa de área, sem o arquivo vetorial georreferenciado anexado.',
    category: 'importante',
    impactOnReport:
      'Dificulta a inserção no sistema de monitoramento contínuo e cálculo de dano ambiental.',
    fieldGuidance:
      'Processar trilha de GPS ou ortofoto de drone para gerar camada .shp ou .geojson.',
    resolved: false,
  },
]

export const DEMO_DOCUMENT_INSTRUMENTS: DocumentInstrument[] = [
  {
    id: 'inst-1',
    type: 'Auto de Constatação',
    code: 'AC-00324',
    number: '00324',
    date: '12/09/2026',
    parties: 'Responsável a apurar / Imóvel Gleba Castanhal',
    location: 'APA Setor Norte — Altamira/PA',
    area: '12,3 ha',
    coordinates: '-8.0015, -34.0042',
    status: 'Lavrado',
    consistencyNotes: 'Instrumento inicial lavrado em campo pelo Agente Léo.',
  },
  {
    id: 'inst-2',
    type: 'Auto de Infração',
    code: 'AIA-00324',
    number: '00324',
    date: '12/09/2026',
    parties: 'Responsável a apurar (Notificação emitida)',
    citedPreviousInstrumentNumber: '00324',
    location: 'APA Setor Norte — Altamira/PA',
    area: '12,4 ha',
    coordinates: '-8.0015, -34.0042',
    status: 'Lavrado',
    consistencyNotes:
      'Cita Auto de Constatação 00324. Área citada baseia-se na declaração de campo (12,4 ha).',
  },
  {
    id: 'inst-3',
    type: 'Termo de Embargo',
    code: 'TE-00189',
    number: '00189',
    date: '12/09/2026',
    parties: 'Gleba Castanhal / Ocupante notificado',
    citedPreviousInstrumentNumber: '00342', // DIVERGÊNCIA PROPOSITALE!
    location: 'APA Setor Norte — Altamira/PA',
    area: '12,3 ha',
    coordinates: '-8.0015, -34.0042',
    status: 'Lavrado',
    consistencyNotes:
      'ALERTA: Termo de Embargo cita Auto de Infração nº 00342, porém o Auto identificado na ocorrência é nº 00324.',
  },
  {
    id: 'inst-4',
    type: 'Relatório de Fiscalização',
    code: 'REL-2026-001',
    number: 'REL-2026/0912',
    date: '12/09/2026',
    parties: 'Gleba Castanhal / Responsável sob apuração',
    citedPreviousInstrumentNumber: '00324 e 00189',
    location: 'APA Setor Norte — Altamira/PA',
    area: '11,8 ha a 12,4 ha (Ressalva de medição)',
    coordinates: '-8.0015, -34.0042',
    status: 'Em elaboração',
    consistencyNotes:
      'Minuta técnica com rastreabilidade direta e registro de divergência entre os instrumentos.',
  },
]

export const DEMO_INSTRUMENT_CONSISTENCY_CHECKS: InstrumentConsistencyCheck[] = [
  {
    property: 'identificador_auto',
    label: 'Número do Auto de Infração Referenciado',
    constatacaoValue: '00324',
    infracaoValue: '00324',
    embargoValue: '00342 (⚠ Inconsistente)',
    relatorioValue: '00324 (com ressalva da citação 00342)',
    status: 'Divergência',
    divergenceAlert:
      'Termo de Embargo cita Auto de Infração nº 00342, porém o Auto identificado na ocorrência é nº 00324.',
  },
  {
    property: 'area_informada',
    label: 'Área da Atividade / Infração',
    constatacaoValue: '12,3 ha',
    infracaoValue: '12,4 ha',
    embargoValue: '12,3 ha',
    relatorioValue: '11,8 ha (vetorial) / 12,4 ha (campo)',
    status: 'Divergência',
    divergenceAlert:
      'Divergência de 0,6 ha entre a estimativa de campo (12,4 ha) e a poligonal delimitada por ortofoto (11,8 ha).',
  },
  {
    property: 'coordenadas_sede',
    label: 'Coordenadas Principais',
    constatacaoValue: '-8.0015, -34.0042',
    infracaoValue: '-8.0015, -34.0042',
    embargoValue: '-8.0015, -34.0042',
    relatorioValue: '-8.0015, -34.0042',
    status: 'Consistente',
  },
  {
    property: 'qualificacao_partes',
    label: 'Autuado / Responsável Qualificado',
    constatacaoValue: 'Não identificado no ato',
    infracaoValue: 'Pendente de notificação dominial',
    embargoValue: 'Ocupante da Gleba Castanhal',
    relatorioValue: 'Informação não localizada nas evidências fornecidas',
    status: 'Ausente',
    divergenceAlert: 'Nenhum instrumento formal qualificou com CPF/CNPJ o autuado.',
  },
  {
    property: 'data_lavratura',
    label: 'Data de Lavratura',
    constatacaoValue: '12/09/2026',
    infracaoValue: '12/09/2026',
    embargoValue: '12/09/2026',
    relatorioValue: '12/09/2026',
    status: 'Consistente',
  },
]

export const DEMO_DRAFT_SECTIONS: DraftSection[] = [
  {
    id: 1,
    title: '1. Identificação da Fiscalização e da Operação',
    subtitle: 'Origem, equipe e número de controle',
    content:
      'A presente minuta de relatório de fiscalização ambiental refere-se à vistoria de campo realizada em 12/09/2026 na Área de Proteção Ambiental — Gleba Castanhal, comarca de Altamira/PA, sob coordenação da Equipe Tática Ambiental (Agentes Léo, Ana e Jhay), em atendimento a alerta de supressão florestal.',
    references: [
      {
        evidenceCode: 'field-notes.md',
        evidenceType: 'Anotação',
        locationWithinEvidence: 'Cabeçalho',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'EVD-022',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Auto de Constatação nº 00324',
        confidence: 'Alta',
      },
    ],
  },
  {
    id: 2,
    title: '2. Identificação do Imóvel e das Partes',
    subtitle: 'Qualificação dominial e responsáveis apurados',
    content:
      'O imóvel inspecionado localiza-se na APA Setor Norte (Gleba Castanhal). O número do Cadastro Ambiental Rural (CAR): [INFORMAÇÃO NÃO LOCALIZADA NAS EVIDÊNCIAS FORNECIDAS]. O nome e qualificação do responsável/infrator: [INFORMAÇÃO NÃO LOCALIZADA NAS EVIDÊNCIAS FORNECIDAS]. Foi identificada apenas a presença de trabalhador rural temporário na entrada da área, sem poderes de representação formal.',
    references: [
      {
        evidenceCode: 'EVD-017 (DOC-003)',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Notificação formal CAR',
        confidence: 'Baixa',
      },
      {
        evidenceCode: 'EVD-021',
        evidenceType: 'Depoimento',
        locationWithinEvidence: 'Declaração informal',
        confidence: 'Média',
      },
    ],
    hasMissingInfo: true,
  },
  {
    id: 3,
    title: '3. Contexto da Fiscalização e Motivação',
    subtitle: 'Alertas espaciais e motivação da incursão',
    content:
      'A equipe deslocou-se para a coordenada de referência após identificação de polígono de alerta satelital indicativo de corte raso recente. A vistoria terrestre iniciou-se às 08:30 no marco de entrada georreferenciado.',
    references: [
      {
        evidenceCode: 'EVD-020',
        evidenceType: 'Localização',
        locationWithinEvidence: 'Marco de entrada 09:05',
        confidence: 'Alta',
      },
    ],
  },
  {
    id: 4,
    title: '4. Descrição Circunstanciada dos Fatos Constatados',
    subtitle: 'Fatos físicos verificados pela equipe',
    content:
      'A equipe constatou a existência de área recentemente suprimida com corte de espécimes arbóreos de grande porte, destacando-se tocos frescos com marcas de motosserra, rastros de maquinário pesado (trator de esteira com lâmina frontal) e toras de Castanheira e Ipê agrupadas próximas ao igarapé.',
    references: [
      {
        evidenceCode: 'foto_03.jpg (EVD-016)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Madeira empilhada',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'foto_05.jpg (EVD-015)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Rastros de trator',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'field-notes.md',
        evidenceType: 'Anotação',
        locationWithinEvidence: 'Linha 1 a 3',
        confidence: 'Alta',
      },
    ],
  },
  {
    id: 5,
    title: '5. Localização e Delimitação da Área Afetada',
    subtitle: 'Coordenadas SIRGAS 2000 e quantificação de área',
    content:
      'O ponto central da supressão foi registrado nas coordenadas Latitude -8.001500, Longitude -34.004200 (extraídas da fotografia foto_07.jpg com metadados EXIF). Quanto à extensão da área afetada: [DIVERGÊNCIA ENCONTRADA — Área estimada nas notas: 12,3 ha / Declaração no áudio de campo: 12,4 ha / Área medida posteriormente por drone: 11,8 ha / Status: requer validação humana].',
    references: [
      {
        evidenceCode: 'foto_07.jpg (EVD-014)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'EXIF GPS -8.0015, -34.0042',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'audio_campo_03.mp3',
        evidenceType: 'Áudio',
        locationWithinEvidence: '01:24',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'field-notes.md',
        evidenceType: 'Anotação',
        locationWithinEvidence: 'Linha 2',
        confidence: 'Média',
      },
      {
        evidenceCode: 'drone_ortomosaico_01.tif (EVD-023)',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Voo RPA',
        confidence: 'Alta',
      },
    ],
    hasDivergence: true,
    divergenceAlert:
      'Divergência entre 11,8 ha, 12,3 ha e 12,4 ha requer seleção e justificativa do fiscal.',
  },
  {
    id: 6,
    title: '6. Evidências Coletadas em Campo',
    subtitle: 'Custódia de fotografias, áudios, vídeos e registros',
    content:
      'Foram catalogadas 14 evidências, incluindo: 5 fotografias digitais com indicadores de integridade de arquivo, 1 gravação de áudio de campo (audio_campo_03.mp3 com transcrição e minutagem), 1 gravação em vídeo de leito assoreado, 1 caderneta de campo original preservada, 2 notificações e autos, e 4 marcos de coordenadas georreferenciadas.',
    references: [
      {
        evidenceCode: 'audio_campo_03.mp3',
        evidenceType: 'Áudio',
        locationWithinEvidence: 'Áudio bruto 03:42',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'foto_07.jpg',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'EVD-014',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'field-notes.md',
        evidenceType: 'Anotação',
        locationWithinEvidence: 'Caderneta original',
        confidence: 'Alta',
      },
    ],
  },
  {
    id: 7,
    title: '7. Enquadramento Técnico-Legal Preliminar',
    subtitle: 'Tipificação sugerida com postura de apoio',
    content:
      'Os fatos observados sugerem, a título de apoio ao fiscal competente, tipificação preliminar com fulcro no Art. 50 (destruir ou danificar florestas nativas ou vegetação fixadora de dunas) e Art. 38-A (destruir ou danificar vegetação primária ou secundária em estágio avançado) da Lei Federal nº 9.605/1998.',
    references: [
      {
        evidenceCode: 'EVD-022',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Auto de Constatação',
        confidence: 'Alta',
      },
    ],
  },
  {
    id: 8,
    title: '8. Instrumentos Lavrados e Cadeia Documental',
    subtitle: 'Conexão entre autos, termos e relatórios',
    content:
      'Constata-se a lavratura do Auto de Constatação nº 00324, do Auto de Infração nº 00324 e do Termo de Embargo nº 00189. [ALERTA DE DIVERGÊNCIA: O Termo de Embargo cita o Auto nº 00342 em sua cláusula de referência, divergindo do número 00324 identificado na ocorrência — requer retificação prévia à juntada final].',
    references: [
      {
        evidenceCode: 'EVD-022',
        evidenceType: 'Documento',
        locationWithinEvidence: 'AC nº 00324',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'Termo de Embargo',
        evidenceType: 'Documento',
        locationWithinEvidence: 'TE nº 00189',
        confidence: 'Média',
      },
    ],
    hasDivergence: true,
  },
  {
    id: 9,
    title: '9. Anexos e Indicadores de Integridade',
    subtitle: 'Relação de mídias e arquivos comprobatórios',
    content:
      'Integram este relatório os anexos fotográficos com coordenadas estampadas, a transcrição integral do arquivo audio_campo_03.mp3, a transcrição literal da caderneta de campo field-notes.md e os indicadores de integridade dos arquivos (hashes SHA-256 calculados para assegurar a autenticidade dos registros digitais).',
    references: [
      {
        evidenceCode: 'audio_campo_03.mp3',
        evidenceType: 'Áudio',
        locationWithinEvidence: 'Hash SHA256 validado',
        confidence: 'Alta',
      },
      {
        evidenceCode: 'foto_07.jpg',
        evidenceType: 'Fotografia',
        locationWithinEvidence: 'Hash SHA256 validado',
        confidence: 'Alta',
      },
    ],
  },
  {
    id: 10,
    title: '10. Pendências, Ressalvas e Recomendações',
    subtitle: 'Pontos que impedem a homologação conclusiva imediata',
    content:
      'Ressalva-se que este documento constitui minuta preliminar. Para conclusão e defensabilidade técnica do processo, recomenda-se: 1) Sanar a divergência de citação do Auto de Infração no Termo de Embargo (00342 vs 00324); 2) Definir a área oficial a ser adotada (11,8 ha ou 12,4 ha); 3) Obter a qualificação dominial do CAR e a autoria subjetiva do ilícito.',
    references: [
      {
        evidenceCode: 'Relatório de Verificação RastroVerde',
        evidenceType: 'Documento',
        locationWithinEvidence: 'Auditoria de integridade',
        confidence: 'Alta',
      },
    ],
    hasMissingInfo: true,
  },
]

export const DEMO_COST_METRICS: CostProcessingMetrics = {
  method: 'Pipeline Local Heurístico + Extração de Metadados EXIF/Audio Transcribe',
  model: 'Whisper local / Parser Geoespacial',
  estimatedCost: 'Ainda não medido.',
  processingTime: 'Ainda não medido.',
  processedUnits:
    '14 evidências analisadas (1 áudio, 5 fotos, 2 anotações, 4 documentos, 2 coordenadas)',
}
