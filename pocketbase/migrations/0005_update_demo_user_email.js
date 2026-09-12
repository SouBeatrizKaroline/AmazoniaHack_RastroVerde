/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // 1. Delete or rename user with email 1aspiraqualquer@gmail.com
    try {
      const oldUser = app.findAuthRecordByEmail('_pb_users_auth_', '1aspiraqualquer@gmail.com')
      app.delete(oldUser)
    } catch (err) {
      // If delete failed or user not found, try raw SQL
      try {
        app.db().newQuery("DELETE FROM users WHERE email = '1aspiraqualquer@gmail.com'").execute()
      } catch (_) {}
    }

    // 2. Ensure demo@rastroverde.local exists
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'demo@rastroverde.local')
    } catch (_) {
      const users = app.findCollectionByNameOrId('_pb_users_auth_')
      const newUser = new Record(users)
      newUser.setEmail('demo@rastroverde.local')
      newUser.setPassword('Demo@RastroVerde2026')
      newUser.setVerified(true)
      newUser.set('name', 'Agente Demo Fiscalização')
      app.save(newUser)
    }
  },
  (app) => {
    // down: no-op
  },
)
