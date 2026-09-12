migrate(
  (app) => {
    // Update inspections table: replace Beatriz in agent field with Léo, Ana, Jhay
    app
      .db()
      .newQuery(`
    UPDATE inspections 
    SET agent = 'Agente 01 — Léo' 
    WHERE agent LIKE '%Beatriz%' AND id_number = 'RV-DEMO-001'
  `)
      .execute()

    // Update any other inspections with Beatriz
    app
      .db()
      .newQuery(`
    UPDATE inspections 
    SET agent = REPLACE(agent, 'Beatriz Silva', 'Léo'),
        agent = REPLACE(agent, 'Beatriz', 'Léo')
    WHERE agent LIKE '%Beatriz%'
  `)
      .execute()

    // Update evidence table: distribute officers across Léo, Ana and Jhay
    // EVD-014, EVD-015 -> Agente 01 — Léo
    // EVD-016, EVD-017 -> Agente 02 — Ana
    // EVD-018, EVD-019, EVD-020, EVD-021 -> Agente 03 — Jhay
    app
      .db()
      .newQuery(`
    UPDATE evidence 
    SET officer = 'Agente 01 — Léo' 
    WHERE code IN ('EVD-014', 'EVD-015') AND officer LIKE '%Beatriz%'
  `)
      .execute()

    app
      .db()
      .newQuery(`
    UPDATE evidence 
    SET officer = 'Agente 02 — Ana' 
    WHERE code IN ('EVD-016', 'EVD-017') AND officer LIKE '%Beatriz%'
  `)
      .execute()

    app
      .db()
      .newQuery(`
    UPDATE evidence 
    SET officer = 'Agente 03 — Jhay' 
    WHERE code IN ('EVD-018', 'EVD-019', 'EVD-020', 'EVD-021') AND officer LIKE '%Beatriz%'
  `)
      .execute()

    // Catch-all for any remaining evidence with Beatriz
    app
      .db()
      .newQuery(`
    UPDATE evidence 
    SET officer = 'Agente 01 — Léo' 
    WHERE officer LIKE '%Beatriz%'
  `)
      .execute()

    // Update activities table
    app
      .db()
      .newQuery(`
    UPDATE activities 
    SET actor = 'Agente 01 — Léo' 
    WHERE actor LIKE '%Beatriz%'
  `)
      .execute()

    // Ensure file field in evidence collection exists with appropriate config
    try {
      const evdCol = app.findCollectionByNameOrId('evidence')
      const fileField = evdCol.fields.getByName('file')
      if (fileField) {
        fileField.maxSelect = 1
        fileField.maxSize = 25 * 1024 * 1024 // 25MB
        fileField.mimeTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
          'application/pdf',
          'audio/mpeg',
          'audio/wav',
          'audio/ogg',
          'video/mp4',
          'video/webm',
          'text/plain',
        ]
        app.save(evdCol)
      }
    } catch (e) {
      console.log('Error updating evidence file field config:', e)
    }
  },
  (app) => {
    // Revert back
  },
)
