/// <reference path="../pb_data/types.d.ts" />

// Hook de consulta ao agente de IA do RastroVerde
routerAdd('POST', '/backend/v1/rastroverde-ask', (e) => {
  try {
    const body = e.requestInfo().body || {}
    let userId = e.auth?.id

    if (!userId) {
      try {
        const demoUser = $app.findAuthRecordByEmail('_pb_users_auth_', 'demo@rastroverde.local')
        userId = demoUser?.id
      } catch (_) {}
    }

    if (!body.message || !body.message.trim()) {
      return e.badRequestError('Mensagem não fornecida.')
    }

    if (!userId) {
      return e.json(503, { error: 'Usuário de atendimento não disponível.' })
    }

    const result = $ai.agent('rastroverde-assistant').chat({
      user_id: userId,
      conversation_id: body.conversation_id || null,
      message: body.message,
    })

    return e.json(200, {
      conversation_id: result.conversation_id,
      content: result.content,
      citations: result.citations || [],
      message_id: result.message_id,
    })
  } catch (err) {
    if (err instanceof SkipAiConfigError) {
      return e.json(503, { error: 'Serviço de IA temporariamente indisponível.' })
    }
    if (err instanceof SkipAiAgentsError) {
      const status = err.status || 500
      return e.json(status, { error: status >= 500 ? 'Falha no assistente de IA' : err.message })
    }
    if (err instanceof SkipAiError) {
      const status = err.status || 502
      return e.json(status, {
        error: status >= 500 ? 'IA temporariamente indisponível.' : err.message,
      })
    }
    return e.json(500, { error: 'Erro interno no processamento da solicitação.' })
  }
})
