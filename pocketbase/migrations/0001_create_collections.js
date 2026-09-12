/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // 1. inspections collection
    const inspections = new Collection({
      name: 'inspections',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'id_number', type: 'text', required: true },
        { name: 'date', type: 'text' },
        { name: 'time', type: 'text' },
        { name: 'agent', type: 'text', required: true },
        { name: 'team', type: 'text' },
        { name: 'location', type: 'text', required: true },
        { name: 'municipality', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
        {
          name: 'occurrence_type',
          type: 'select',
          required: true,
          values: [
            'Desmatamento',
            'Queimada',
            'Mineração irregular',
            'Ocupação irregular',
            'Poluição',
            'Extração de madeira',
            'Crime contra fauna',
            'Outro',
          ],
          maxSelect: 1,
        },
        { name: 'description', type: 'text' },
        { name: 'notes', type: 'text' },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: [
            'Em coleta',
            'Em análise',
            'Com pendências',
            'Pronta para relatório',
            'Finalizada',
          ],
          maxSelect: 1,
        },
        { name: 'is_demo', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_inspections_id_number ON inspections (id_number)',
        'CREATE INDEX idx_inspections_status ON inspections (status)',
      ],
    })
    app.save(inspections)

    const inspectionsId = inspections.id

    // 2. evidence collection
    const evidence = new Collection({
      name: 'evidence',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'inspection',
          type: 'relation',
          required: true,
          collectionId: inspectionsId,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'code', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: [
            'Fotografia',
            'Vídeo',
            'Áudio',
            'Documento',
            'Anotação',
            'Localização',
            'Depoimento',
          ],
          maxSelect: 1,
        },
        { name: 'date', type: 'text' },
        { name: 'time', type: 'text' },
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
        { name: 'officer', type: 'text' },
        { name: 'description', type: 'text', required: true },
        { name: 'tags', type: 'text' },
        { name: 'notes', type: 'text' },
        {
          name: 'file',
          type: 'file',
          maxSelect: 1,
          maxSize: 10485760,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['Registrada', 'Em revisão', 'Verificada'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_evidence_code ON evidence (code)',
        'CREATE INDEX idx_evidence_inspection ON evidence (inspection)',
        'CREATE INDEX idx_evidence_type ON evidence (type)',
        'CREATE INDEX idx_evidence_status ON evidence (status)',
      ],
    })
    app.save(evidence)

    const evidenceId = evidence.id

    // 3. activities collection
    const activities = new Collection({
      name: 'activities',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'inspection',
          type: 'relation',
          required: true,
          collectionId: inspectionsId,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'timestamp', type: 'text' },
        { name: 'actor', type: 'text' },
        { name: 'description', type: 'text', required: true },
        {
          name: 'linked_evidence',
          type: 'relation',
          collectionId: evidenceId,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_activities_inspection ON activities (inspection)'],
    })
    app.save(activities)
  },
  (app) => {
    try {
      const act = app.findCollectionByNameOrId('activities')
      app.delete(act)
    } catch (_) {}
    try {
      const evd = app.findCollectionByNameOrId('evidence')
      app.delete(evd)
    } catch (_) {}
    try {
      const insp = app.findCollectionByNameOrId('inspections')
      app.delete(insp)
    } catch (_) {}
  },
)
