/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // 1. Seed demo user (idempotent)
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', '1aspiraqualquer@gmail.com')
    } catch (_) {
      const user = new Record(users)
      user.setEmail('1aspiraqualquer@gmail.com')
      user.setPassword('Skip@Pass')
      user.setVerified(true)
      user.set('name', 'Agente Demo Fiscalização')
      app.save(user)
    }

    const inspectionsCol = app.findCollectionByNameOrId('inspections')
    const evidenceCol = app.findCollectionByNameOrId('evidence')
    const activitiesCol = app.findCollectionByNameOrId('activities')

    // 2. Seed RV-DEMO-001 inspection (idempotent)
    let demoInspection
    try {
      demoInspection = app.findFirstRecordByData('inspections', 'id_number', 'RV-DEMO-001')
    } catch (_) {
      demoInspection = new Record(inspectionsCol)
      demoInspection.set('id_number', 'RV-DEMO-001')
      demoInspection.set('date', '2026-09-12')
      demoInspection.set('time', '08:30')
      demoInspection.set('agent', 'Agente 01 — Beatriz Silva')
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

    // Also seed 2 extra demo inspections for dashboard/list realism
    try {
      app.findFirstRecordByData('inspections', 'id_number', 'RV-2026-002')
    } catch (_) {
      const insp2 = new Record(inspectionsCol)
      insp2.set('id_number', 'RV-2026-002')
      insp2.set('date', '2026-09-10')
      insp2.set('time', '10:15')
      insp2.set('agent', 'Léo Matias Araújo')
      insp2.set('team', 'Equipe Fogo e Queimadas')
      insp2.set('location', 'Reserva Biológica Serra Verde')
      insp2.set('municipality', 'Altamira')
      insp2.set('state', 'PA')
      insp2.set('latitude', -3.2033)
      insp2.set('longitude', -52.2064)
      insp2.set('occurrence_type', 'Queimada')
      insp2.set(
        'description',
        'Foco de calor ativo em borda de floresta contígua a pastagem consolidada.',
      )
      insp2.set('notes', 'Ação de combate imediato solicitada ao corpo de bombeiros florestal.')
      insp2.set('status', 'Com pendências')
      insp2.set('is_demo', false)
      app.save(insp2)
    }

    try {
      app.findFirstRecordByData('inspections', 'id_number', 'RV-2026-003')
    } catch (_) {
      const insp3 = new Record(inspectionsCol)
      insp3.set('id_number', 'RV-2026-003')
      insp3.set('date', '2026-09-08')
      insp3.set('time', '14:00')
      insp3.set('agent', 'Sonia Janara S. Barros')
      insp3.set('team', 'Divisão de Recursos Hídricos')
      insp3.set('location', 'Bacia do Rio Cristalino — Margem Direita')
      insp3.set('municipality', 'Novo Progresso')
      insp3.set('state', 'PA')
      insp3.set('latitude', -7.1422)
      insp3.set('longitude', -55.4312)
      insp3.set('occurrence_type', 'Mineração irregular')
      insp3.set(
        'description',
        "Dragagem irregular e sedimentação em curso d'água com acampamento desativado.",
      )
      insp3.set('notes', 'Amostras de turbidez coletadas para laudo laboratorial.')
      insp3.set('status', 'Pronta para relatório')
      insp3.set('is_demo', false)
      app.save(insp3)
    }

    // 3. Seed evidence for RV-DEMO-001 (~8 items)
    // Deliberate test fixtures:
    // - EVD-008: Missing responsible officer (officer is empty)
    // - EVD-018: Inconsistent note (description conflicts with coordinates)
    // - EVD-017: Pending document (DOC-003)
    const seedEvidences = [
      {
        code: 'EVD-014',
        type: 'Fotografia',
        date: '2026-09-12',
        time: '14:32',
        latitude: -8.0,
        longitude: -34.0,
        officer: 'Agente 01 — Beatriz Silva',
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
        officer: 'Agente 01 — Beatriz Silva',
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
        officer: 'Agente 01 — Beatriz Silva',
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
        officer: 'Agente 01 — Beatriz Silva',
        description:
          'DOC-003 — Notificação de apresentação de Cadastro Ambiental Rural (CAR) e título dominial.',
        tags: 'documento, pendente, dominial',
        notes:
          'Documento de propriedade não anexado pelo ocupante no momento da diligência. Prazo assinalado.',
        status: 'Em revisão',
      },
      {
        code: 'EVD-018',
        type: 'Anotação',
        date: '2026-09-12',
        time: '15:20',
        latitude: -8.001,
        longitude: -34.0012,
        officer: 'Agente 01 — Beatriz Silva',
        description:
          "Anotação de campo: 'Avistado acampamento temporário a 3 km ao sul da sede da fazenda' — coordenada registrada no aparelho situa o ponto a 800m a norte.",
        tags: 'anotação, coordenada, conferência',
        notes:
          'Possível discrepância entre a anotação manual e os dados do receptor GNSS. Recomenda-se aferição.',
        status: 'Em revisão',
      },
      {
        code: 'EVD-019',
        type: 'Anotação',
        date: '2026-09-12',
        time: '15:40',
        latitude: -8.004,
        longitude: -34.005,
        officer: 'Agente 01 — Beatriz Silva',
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
        officer: 'Agente 01 — Beatriz Silva',
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
        officer: 'Agente 01 — Beatriz Silva',
        description:
          'Declaração informal de trabalhador rural temporário encontrado nas proximidades da porteira.',
        tags: 'depoimento, testemunha, campo',
        notes:
          'Informou que tratores operaram na gleba nos últimos quatro dias sob ordem de terceiro não localizado.',
        status: 'Registrada',
      },
      {
        code: 'EVD-008',
        type: 'Anotação',
        date: '2026-09-12',
        time: '11:15',
        latitude: -8.0028,
        longitude: -34.0033,
        officer: '', // Deliberate gap: missing officer identification
        description: 'Registro de marca de motosserra em toco fresco de castanheira.',
        tags: 'motosserra, toco, supressão',
        notes: 'Observação registrada sem a identificação do agente responsável pelo lançamento.',
        status: 'Em revisão',
      },
    ]

    const createdEvidences = {}
    for (let i = 0; i < seedEvidences.length; i++) {
      const item = seedEvidences[i]
      let evdRecord
      try {
        evdRecord = app.findFirstRecordByData('evidence', 'code', item.code)
      } catch (_) {
        evdRecord = new Record(evidenceCol)
        evdRecord.set('inspection', demoInspection.id)
        evdRecord.set('code', item.code)
        evdRecord.set('type', item.type)
        evdRecord.set('date', item.date)
        evdRecord.set('time', item.time)
        evdRecord.set('latitude', item.latitude)
        evdRecord.set('longitude', item.longitude)
        evdRecord.set('officer', item.officer)
        evdRecord.set('description', item.description)
        evdRecord.set('tags', item.tags)
        evdRecord.set('notes', item.notes)
        evdRecord.set('status', item.status)
        app.save(evdRecord)
      }
      createdEvidences[item.code] = evdRecord.id
    }

    // 4. Seed activities for RV-DEMO-001 timeline
    const seedActivities = [
      {
        timestamp: '08:42',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Fiscalização iniciada — deslocamento terrestre até o Setor Norte.',
      },
      {
        timestamp: '09:05',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Localização registrada — Marco de entrada fixado.',
        evidenceCode: 'EVD-020',
      },
      {
        timestamp: '09:17',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Evidência fotográfica adicionada — Clareira e vegetação removida.',
        evidenceCode: 'EVD-014',
      },
      {
        timestamp: '09:33',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Depoimento registrado — Trabalhador temporário ouvido no local.',
        evidenceCode: 'EVD-021',
      },
      {
        timestamp: '10:02',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Documento anexado — Notificação DOC-003 emitida.',
        evidenceCode: 'EVD-017',
      },
      {
        timestamp: '10:25',
        actor: 'Sistema RastroVerde',
        description:
          'Inconsistência identificada — Coordenada registrada difere da descrição na anotação.',
        evidenceCode: 'EVD-018',
      },
      {
        timestamp: '10:42',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Nova evidência adicionada — Pilhas de toras de madeira protegida.',
        evidenceCode: 'EVD-016',
      },
      {
        timestamp: '11:05',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Coleta finalizada — Equipe iniciou organização das evidências.',
      },
      {
        timestamp: '14:32',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Evidência EVD-014 adicionada ao dossiê pelo Agente 01.',
      },
      {
        timestamp: '14:40',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Descrição atualizada para precisão de poligonal.',
      },
      {
        timestamp: '15:02',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Documento DOC-003 registrado com pendência de comprovação dominial.',
      },
      {
        timestamp: '15:15',
        actor: 'Sistema RastroVerde',
        description: 'Pendência identificada — Responsável pela área e CAR não vinculados.',
      },
      {
        timestamp: '15:37',
        actor: 'Agente 01 — Beatriz Silva',
        description: 'Informação complementar adicionada com sementes de pastagem.',
      },
    ]

    for (let i = 0; i < seedActivities.length; i++) {
      const act = seedActivities[i]
      // Check if an activity with same timestamp and description exists
      try {
        const existing = app.findRecordsByFilter(
          'activities',
          `inspection = "${demoInspection.id}" && timestamp = "${act.timestamp}" && description ~ "${act.description.slice(0, 20)}"`,
          '-created',
          1,
          0,
        )
        if (existing.length > 0) continue
      } catch (_) {}

      const actRecord = new Record(activitiesCol)
      actRecord.set('inspection', demoInspection.id)
      actRecord.set('timestamp', act.timestamp)
      actRecord.set('actor', act.actor)
      actRecord.set('description', act.description)
      if (act.evidenceCode && createdEvidences[act.evidenceCode]) {
        actRecord.set('linked_evidence', createdEvidences[act.evidenceCode])
      }
      app.save(actRecord)
    }
  },
  (app) => {
    // down: nothing destructive in development
  },
)
