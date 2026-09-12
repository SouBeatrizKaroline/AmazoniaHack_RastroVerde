migrate(
  (app) => {
    try {
      const insp = app.findFirstRecordByData('inspections', 'id_number', 'RV-DEMO-001')
      if (!insp) return

      try {
        app.findFirstRecordByData('evidence', 'code', 'EVD-022')
        // already exists
        return
      } catch (_) {
        const evdCol = app.findCollectionByNameOrId('evidence')
        const record = new Record(evdCol)
        record.set('inspection', insp.id)
        record.set('code', 'EVD-022')
        record.set('type', 'Documento')
        record.set('date', '2026-09-12')
        record.set('time', '16:00')
        record.set('latitude', -8.0015)
        record.set('longitude', -34.0042)
        record.set('officer', 'Agente 01 — Léo')
        record.set('description', 'Auto de Constatação Preliminar ACP-2026-0912 emitido em campo.')
        record.set('tags', 'auto, fiscalização, constatação, documento')
        record.set(
          'notes',
          'Documento formal de constatação prévia emitido pela equipe com registro fotográfico e coordenadas de ancoragem.',
        )
        record.set('status', 'Verificada')
        app.save(record)

        // Also add an activity record for audit trail
        try {
          const actCol = app.findCollectionByNameOrId('activities')
          const actRecord = new Record(actCol)
          actRecord.set('inspection', insp.id)
          actRecord.set('timestamp', '16:00')
          actRecord.set('actor', 'Agente 01 — Léo')
          actRecord.set(
            'description',
            'Emissão e registro do Auto de Constatação Preliminar ACP-2026-0912 no dossiê.',
          )
          actRecord.set('linked_evidence', record.id)
          app.save(actRecord)
        } catch (e) {
          console.log('Error creating activity record:', e)
        }
      }
    } catch (err) {
      console.log('Error in migration 0010:', err)
    }
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData('evidence', 'code', 'EVD-022')
      if (record) {
        app.delete(record)
      }
    } catch (_) {}
  },
)
