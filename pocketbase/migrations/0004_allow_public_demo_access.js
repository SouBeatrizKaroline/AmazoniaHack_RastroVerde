/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // 1. Make collections public for read and write so demo mode works seamlessly without requiring authentication
    const inspections = app.findCollectionByNameOrId('inspections')
    inspections.listRule = ''
    inspections.viewRule = ''
    inspections.createRule = ''
    inspections.updateRule = ''
    inspections.deleteRule = ''
    app.save(inspections)

    const evidence = app.findCollectionByNameOrId('evidence')
    evidence.listRule = ''
    evidence.viewRule = ''
    evidence.createRule = ''
    evidence.updateRule = ''
    evidence.deleteRule = ''
    app.save(evidence)

    const activities = app.findCollectionByNameOrId('activities')
    activities.listRule = ''
    activities.viewRule = ''
    activities.createRule = ''
    activities.updateRule = ''
    activities.deleteRule = ''
    app.save(activities)

    // 2. Ensure demo user password is set to Demo@RastroVerde2026 for consistent demo login
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'demo@rastroverde.local')
      user.setPassword('Demo@RastroVerde2026')
      user.setVerified(true)
      app.save(user)
    } catch (_) {}
  },
  (app) => {
    try {
      const inspections = app.findCollectionByNameOrId('inspections')
      inspections.listRule = "@request.auth.id != ''"
      inspections.viewRule = "@request.auth.id != ''"
      inspections.createRule = "@request.auth.id != ''"
      inspections.updateRule = "@request.auth.id != ''"
      inspections.deleteRule = "@request.auth.id != ''"
      app.save(inspections)
    } catch (_) {}

    try {
      const evidence = app.findCollectionByNameOrId('evidence')
      evidence.listRule = "@request.auth.id != ''"
      evidence.viewRule = "@request.auth.id != ''"
      evidence.createRule = "@request.auth.id != ''"
      evidence.updateRule = "@request.auth.id != ''"
      evidence.deleteRule = "@request.auth.id != ''"
      app.save(evidence)
    } catch (_) {}

    try {
      const activities = app.findCollectionByNameOrId('activities')
      activities.listRule = "@request.auth.id != ''"
      activities.viewRule = "@request.auth.id != ''"
      activities.createRule = "@request.auth.id != ''"
      activities.updateRule = "@request.auth.id != ''"
      activities.deleteRule = "@request.auth.id != ''"
      app.save(activities)
    } catch (_) {}
  },
)
