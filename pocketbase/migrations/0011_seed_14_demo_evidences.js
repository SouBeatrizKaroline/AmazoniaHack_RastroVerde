/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // 1. Ensure inspection RV-DEMO-001 exists and has correct demo data
    const inspectionsCol = app.findCollectionByNameOrId('inspections')
    const evidenceCol = app.findCollectionByNameOrId('evidence')
    const activitiesCol = app.findCollectionByNameOrId('activities')

    let demoInspection
    try {
      demoInspection = app.findFirstRecordByData('inspections', 'id_number', 'RV-DEMO-001')
      // Update fields to ensure full demo consistency
      demoInspection.set('is_demo', true)
      if (!demoInspection.get('agent')) demoInspection.set('agent', 'Agente 01 — Léo')
      app.save(demoInspection)
    } catch (_) {
      demoInspection = new Record(inspectionsCol)
      demoInspection.set('id_number', 'RV-DEMO-001')
      demoInspection.set('date', '2026-09-12')
      demoInspection.set('time', '08:30')
      demoInspection.set('agent', 'Agente 01 — Léo')
      demoInspection.set('team', 'Equipe Tática Ambiental Setor Norte')
      demoInspection.set('location', 'Área de Proteção Ambiental — Setor Norte')
      demoInspection.set('municipality', 'Rio Claro')
      demoInspection.set('state', 'PA')
      demoInspection.set('latitude', -8.0015)
      demoInspection.set('longitude', -34.0042)
      demoInspection.set('occurrence_type', 'Desmatamento')
      demoInspection.set(
        'description',
        'Identificação preliminar de supressão de vegetação nativa em área protegida com evidências de maquinário pesado e cortes rasos recentes.',
      )
      demoInspection.set(
        'notes',
        'Fiscalização realizada em atendimento a alerta satelital. Área com relevo acidentado e trilhas de acesso recente.',
      )
      demoInspection.set('status', 'Em análise')
      demoInspection.set('is_demo', true)
      app.save(demoInspection)
    }

    // 2. The 14 official demo evidences including the 3 deliberate test flaws:
    // Flaw 1: EVD-008: officer is '' (missing responsible officer)
    // Flaw 2: EVD-018: conflict between description and coordinates (3km south vs 800m north)
    // Flaw 3: EVD-017 / DOC-003: pending document (CAR and land title notification pending)
    const evidencesData = [
      {
        code: 'EVD-008',
        type: 'Anotação',
        date: '2026-09-12',
        time: '11:15',
        latitude: -8.0028,
        longitude: -34.0033,
        officer: '', // Falha proposital 1: sem responsável registrado
        description: 'Registro de marca de motosserra em toco fresco de castanheira.',
        tags: 'motosserra, toco, supressão',
        notes: 'Observação registrada sem a identificação do agente responsável pelo lançamento.',
        status: 'Em revisão',
      },
      {
        code: 'EVD-014',
        type: 'Fotografia',
        date: '2026-09-12',
        time: '14:32',
        latitude: -8.0,
        longitude: -34.0,
        officer: 'Agente 01 — Léo',
        description: 'Área com vegetação removida próxima ao ponto georreferenciado.',
        tags: 'vegetação, áreaDegradada, campo',
        notes: 'Fotografia em ângulo aberto registrando clareira de aproximadamente 4 hectares.',
        status: 'Verificada',
      },
      {
        code: 'EVD-015',
        type: 'Fotografia',
        date: '2026-09-12',
        time: '14:45',
        latitude: -8.0021,
        longitude: -34.0018,
        officer: 'Agente 01 — Léo',
        description: 'Marcas de esteira de trator de lâmina recente no solo argiloso.',
        tags: 'maquinário, rastro, solo',
        notes: 'Sentido leste-oeste em direção à mata primária.',
        status: 'Verificada',
      },
      {
        code: 'EVD-016',
        type: 'Fotografia',
        date: '2026-09-12',
        time: '15:10',
        latitude: -8.0035,
        longitude: -34.0029,
        officer: 'Agente 02 — Ana',
        description: 'Troncos de castanheira e ipê empilhados próximos à margem do igarapé.',
        tags: 'madeira, espécieProtegida, estocagem',
        notes: 'Madeira roliça sem identificação de DOF ou autorização ambiental.',
        status: 'Verificada',
      },
      {
        code: 'EVD-017',
        type: 'Documento',
        date: '2026-09-12',
        time: '15:02',
        latitude: -8.0015,
        longitude: -34.0042,
        officer: 'Agente 02 — Ana',
        description:
          'DOC-003 — Notificação de apresentação de Cadastro Ambiental Rural (CAR) e título dominial.',
        tags: 'documento, pendente, dominial, DOC-003',
        notes:
          'Falha proposital 3: Notificação formal pendente de comprovação dominial/CAR pelo ocupante no prazo fixado.',
        status: 'Em revisão', // Falha proposital 3: DOC-003 pendente
      },
      {
        code: 'EVD-018',
        type: 'Anotação',
        date: '2026-09-12',
        time: '15:20',
        latitude: -8.001,
        longitude: -34.0012,
        officer: 'Agente 03 — Jhay',
        description:
          "Anotação de campo: 'Avistado acampamento temporário a 3 km ao sul da sede da fazenda' — coordenada registrada no aparelho situa o ponto a 800m a norte.",
        tags: 'anotação, coordenada, conferência, conflito',
        notes:
          'Falha proposital 2: Conflito geográfico evidente entre a descrição manual e o ponto GNSS registrado.',
        status: 'Em revisão', // Falha proposital 2: em conflito
      },
      {
        code: 'EVD-019',
        type: 'Anotação',
        date: '2026-09-12',
        time: '15:40',
        latitude: -8.004,
        longitude: -34.005,
        officer: 'Agente 03 — Jhay',
        description:
          'Presença de sementes de braquiária espalhadas a lanço sobre o solo desmatado recente.',
        tags: 'pastagem, conversão, vegetação',
        notes: 'Indício de intenção de conversão rápida da área para pastejo bovino.',
        status: 'Registrada',
      },
      {
        code: 'EVD-020',
        type: 'Localização',
        date: '2026-09-12',
        time: '09:05',
        latitude: -8.0015,
        longitude: -34.0042,
        officer: 'Agente 03 — Jhay',
        description:
          'Marco de entrada principal da propriedade com porteira de acesso e coordenadas fixadas.',
        tags: 'acesso, poligonal, coordenadas',
        notes:
          'Ponto de ancoragem da vistoria terrestre. Receptores calibrados com precisão submétrica.',
        status: 'Verificada',
      },
      {
        code: 'EVD-021',
        type: 'Depoimento',
        date: '2026-09-12',
        time: '09:33',
        latitude: -8.0012,
        longitude: -34.0038,
        officer: 'Agente 03 — Jhay',
        description:
          'Declaração informal de trabalhador rural temporário encontrado nas proximidades da porteira.',
        tags: 'depoimento, testemunha, campo',
        notes:
          'Informou que tratores operaram na gleba nos últimos quatro dias sob ordem de terceiro não localizado.',
        status: 'Registrada',
      },
      {
        code: 'EVD-022',
        type: 'Documento',
        date: '2026-09-12',
        time: '16:00',
        latitude: -8.0015,
        longitude: -34.0042,
        officer: 'Agente 01 — Léo',
        description: 'Auto de Constatação Preliminar ACP-2026-0912 emitido em campo.',
        tags: 'auto, fiscalização, constatação, documento',
        notes:
          'Documento formal de constatação prévia emitido pela equipe com registro fotográfico e coordenadas de ancoragem.',
        status: 'Verificada',
      },
      {
        code: 'EVD-023',
        type: 'Fotografia',
        date: '2026-09-12',
        time: '16:15',
        latitude: -8.0018,
        longitude: -34.0031,
        officer: 'Agente 01 — Léo',
        description:
          'Visão panorâmica em drone da borda florestal e clareira aberta com medição estimada.',
        tags: 'drone, aéreo, clareira, vegetação',
        notes: 'Sobrevoo autorizado com RPA cadastrado. Imagem georreferenciada em alta resolução.',
        status: 'Verificada',
      },
      {
        code: 'EVD-024',
        type: 'Áudio',
        date: '2026-09-12',
        time: '10:10',
        latitude: -8.0022,
        longitude: -34.0025,
        officer: 'Agente 02 — Ana',
        description:
          'Gravação ambiental de ruído intermitente compatível com maquinário pesado ao sul da APA.',
        tags: 'áudio, acústica, maquinário',
        notes: 'Captação sonora de 3 minutos registrada durante inspeção do talhão 2.',
        status: 'Registrada',
      },
      {
        code: 'EVD-025',
        type: 'Vídeo',
        date: '2026-09-12',
        time: '14:50',
        latitude: -8.0024,
        longitude: -34.0022,
        officer: 'Agente 01 — Léo',
        description: 'Registro em vídeo do curso de água assoreado por desvio de terraplanagem.',
        tags: 'vídeo, recursoHídrico, igarapé, assoreamento',
        notes: 'Gravação contínua demonstrando turbidez severa e fluxo interrompido do igarapé.',
        status: 'Verificada',
      },
      {
        code: 'EVD-026',
        type: 'Localização',
        date: '2026-09-12',
        time: '16:30',
        latitude: -8.0045,
        longitude: -34.0055,
        officer: 'Agente 03 — Jhay',
        description:
          'Ponto extremo sul do perímetro inspecionado — divisa com unidade de conservação vizinha.',
        tags: 'limite, divisa, coordenadas, poligonal',
        notes: 'Marco submétrico fixado para fechamento do polígono de interdição preventiva.',
        status: 'Verificada',
      },
    ]

    const savedEvidences = {}

    for (let i = 0; i < evidencesData.length; i++) {
      const item = evidencesData[i]
      let rec
      try {
        rec = app.findFirstRecordByData('evidence', 'code', item.code)
      } catch (_) {
        rec = new Record(evidenceCol)
      }
      rec.set('inspection', demoInspection.id)
      rec.set('code', item.code)
      rec.set('type', item.type)
      rec.set('date', item.date)
      rec.set('time', item.time)
      rec.set('latitude', item.latitude)
      rec.set('longitude', item.longitude)
      rec.set('officer', item.officer)
      rec.set('description', item.description)
      rec.set('tags', item.tags)
      rec.set('notes', item.notes)
      rec.set('status', item.status)
      app.save(rec)
      savedEvidences[item.code] = rec.id
    }

    // 3. Ensure comprehensive activity trail for RV-DEMO-001
    const activitiesData = [
      {
        timestamp: '08:42',
        actor: 'Agente 01 — Léo',
        description: 'Fiscalização iniciada — deslocamento terrestre até o Setor Norte da APA.',
      },
      {
        timestamp: '09:05',
        actor: 'Agente 03 — Jhay',
        description: 'Localização registrada — Marco de entrada da propriedade fixado.',
        code: 'EVD-020',
      },
      {
        timestamp: '09:33',
        actor: 'Agente 03 — Jhay',
        description: 'Depoimento registrado — Trabalhador temporário ouvido no local.',
        code: 'EVD-021',
      },
      {
        timestamp: '10:10',
        actor: 'Agente 02 — Ana',
        description: 'Gravação sonora registrada — Ruído acústico de maquinário ao sul.',
        code: 'EVD-024',
      },
      {
        timestamp: '11:15',
        actor: 'Agente Fiscal',
        description: 'Anotação técnica — Marca de motosserra em toco recente de castanheira.',
        code: 'EVD-008',
      },
      {
        timestamp: '14:32',
        actor: 'Agente 01 — Léo',
        description: 'Evidência fotográfica adicionada — Clareira e vegetação removida.',
        code: 'EVD-014',
      },
      {
        timestamp: '14:45',
        actor: 'Agente 01 — Léo',
        description: 'Evidência fotográfica adicionada — Rastro de esteira de trator no solo.',
        code: 'EVD-015',
      },
      {
        timestamp: '14:50',
        actor: 'Agente 01 — Léo',
        description: 'Registro em vídeo anexado — Assoreamento e barramento do igarapé.',
        code: 'EVD-025',
      },
      {
        timestamp: '15:02',
        actor: 'Agente 02 — Ana',
        description: 'Documento registrado com pendência — Notificação DOC-003 emitida.',
        code: 'EVD-017',
      },
      {
        timestamp: '15:10',
        actor: 'Agente 02 — Ana',
        description: 'Evidência fotográfica adicionada — Pilhas de toras de castanheira e ipê.',
        code: 'EVD-016',
      },
      {
        timestamp: '15:20',
        actor: 'Agente 03 — Jhay',
        description:
          'Inconsistência apontada — Anotação de acampamento em conflito com coordenadas GNSS.',
        code: 'EVD-018',
      },
      {
        timestamp: '15:40',
        actor: 'Agente 03 — Jhay',
        description: 'Anotação de campo adicionada — Sementes de braquiária espalhadas a lanço.',
        code: 'EVD-019',
      },
      {
        timestamp: '16:00',
        actor: 'Agente 01 — Léo',
        description: 'Emissão e registro do Auto de Constatação Preliminar ACP-2026-0912.',
        code: 'EVD-022',
      },
      {
        timestamp: '16:15',
        actor: 'Agente 01 — Léo',
        description: 'Fotografia aérea por drone anexada para cálculo vetorial preliminar.',
        code: 'EVD-023',
      },
      {
        timestamp: '16:30',
        actor: 'Agente 03 — Jhay',
        description: 'Ponto georreferenciado extremo sul fixado para o polígono de interdição.',
        code: 'EVD-026',
      },
    ]

    for (let i = 0; i < activitiesData.length; i++) {
      const act = activitiesData[i]
      try {
        const existing = app.findRecordsByFilter(
          'activities',
          `inspection = "${demoInspection.id}" && timestamp = "${act.timestamp}"`,
          '-created',
          1,
          0,
        )
        if (existing.length > 0) {
          const rec = existing[0]
          rec.set('description', act.description)
          rec.set('actor', act.actor)
          if (act.code && savedEvidences[act.code]) {
            rec.set('linked_evidence', savedEvidences[act.code])
          }
          app.save(rec)
          continue
        }
      } catch (_) {}

      const newAct = new Record(activitiesCol)
      newAct.set('inspection', demoInspection.id)
      newAct.set('timestamp', act.timestamp)
      newAct.set('actor', act.actor)
      newAct.set('description', act.description)
      if (act.code && savedEvidences[act.code]) {
        newAct.set('linked_evidence', savedEvidences[act.code])
      }
      app.save(newAct)
    }
  },
  (app) => {
    // Revert logic
  },
)
