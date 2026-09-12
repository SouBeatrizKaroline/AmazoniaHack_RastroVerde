import React, { useState, useRef, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'
import { Bot, Send, Sparkles, Info, RotateCcw, User, Shield, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import pb from '@/lib/pocketbase/client'

interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  citations?: string[]
  timestamp: string
}

export const AssistantChat: React.FC = () => {
  const { t } = useI18n()

  const suggestedCommands = [
    'Quais informações ainda estão faltando?',
    'Existem conflitos entre as evidências?',
    'Resuma a fiscalização.',
    'Organize as evidências por horário.',
    'Quais registros possuem localização?',
    'Quais pontos precisam de revisão?',
  ]

  // Deterministic domain responses ensuring instant pitch reliability + fallback
  const mockKnowledge: Record<string, string> = {
    'Quais informações ainda estão faltando?':
      'Na fiscalização RV-DEMO-001 foram identificadas as seguintes pendências para revisão:\n\n1. O documento de propriedade e Cadastro Ambiental Rural (CAR) relativo à notificação DOC-003 ainda não foi anexado;\n2. O responsável legal pela área não foi qualificado formalmente;\n3. A área total estimada de supressão ainda não foi calculada;\n4. A evidência EVD-008 (marca de motosserra) não possui identificação do agente responsável.\n\nRecomenda-se suprir essas lacunas antes da emissão definitiva do relatório de infração.',

    'Existem conflitos entre as evidências?':
      'Sim, foi detectada uma possível divergência na evidência EVD-018:\n\nA descrição em anotação indica "acampamento temporário a 3 km ao sul da sede", enquanto as coordenadas georreferenciadas registradas no dispositivo (-8.0010, -34.0012) posicionam o ponto a aproximadamente 800 metros ao norte.\n\nRecomenda-se confirmar a localização exata em campo antes de consolidar o documento.',

    'Resuma a fiscalização.':
      'A fiscalização RV-DEMO-001 foi deflagrada em 12/09/2026 na Área de Proteção Ambiental — Setor Norte (Rio Claro/PA), motivada por alerta de supressão florestal.\n\nA equipe registrou evidências fotográficas de clareiras recentes (EVD-014), marcas de trator (EVD-015) e toras de madeira protegida empilhadas (EVD-016), além de depoimento informal de trabalhador local (EVD-021). O caso encontra-se "Em análise", com taxa de completude de aproximadamente 78%.',

    'Organize as evidências por horário.':
      'Cronologia das evidências coletadas em 12/09/2026:\n\n• 09:05 — EVD-020 (Localização do marco de entrada)\n• 09:33 — EVD-021 (Depoimento informal de trabalhador)\n• 11:15 — EVD-008 (Anotação sobre marcas de motosserra)\n• 14:32 — EVD-014 (Fotografia de clareira e vegetação removida)\n• 14:45 — EVD-015 (Fotografia de esteira de trator no solo)\n• 15:02 — EVD-017 (Documento: Notificação DOC-003)\n• 15:10 — EVD-016 (Fotografia de toras empilhadas)\n• 15:20 — EVD-018 (Anotação de campo sobre acampamento)\n• 15:40 — EVD-019 (Anotação sobre sementes de braquiária)',

    'Quais registros possuem localização?':
      'Todas as evidências EVD-014 a EVD-021 contam com coordenadas georreferenciadas de latitude e longitude registradas, incluindo o ponto de marco de entrada (EVD-020: -8.0015, -34.0042) e o ponto da vegetação suprimida (EVD-014: -8.0000, -34.0000).\n\nRecomenda-se atenção especial à conferência de coordenadas da EVD-018.',

    'Quais pontos precisam de revisão?':
      'Os pontos prioritários para revisão no dossiê RV-DEMO-001 são:\n\n1. EVD-008: ausência de identificação do agente responsável pelo registro;\n2. EVD-018: divergência entre a descrição textual de distância e a coordenada GNSS registrada;\n3. EVD-017: documento comprobatório de posse/propriedade pendente de juntada (DOC-003).',
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: 'Olá, sou o Assistente RastroVerde. Estou conectado à fiscalização RV-DEMO-001 (APA Setor Norte) e posso apoiá-lo na auditoria de evidências, identificação de lacunas e organização cronológica.\n\nComo posso apoiar a sua análise técnica hoje?',
      timestamp: '15:30',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim()
    if (!text || loading) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toTimeString().slice(0, 5),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setLoading(true)

    try {
      // Prioritize Skip Cloud Native Agent endpoint
      const pbUrl = import.meta.env.VITE_POCKETBASE_URL || ''
      const token = pb.authStore.token

      let assistantText = ''
      let citations: string[] = []

      try {
        const res = await fetch(`${pbUrl}/backend/v1/rastroverde-ask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            message: text,
            conversation_id: conversationId,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          if (data.content) {
            assistantText = data.content
            citations = data.citations || []
            if (data.conversation_id) {
              setConversationId(data.conversation_id)
            }
          }
        }
      } catch (agentErr) {
        // Fallback to local deterministic answers
      }

      // If backend didn't return text, use domain knowledge
      if (!assistantText) {
        if (mockKnowledge[text]) {
          assistantText = mockKnowledge[text]
        } else {
          // General cautious supportive answer
          assistantText =
            `Com base nos registros cadastrados para a fiscalização RV-DEMO-001, recomenda-se verificar a consistência dos dados geográficos e das evidências fotográficas citadas. ` +
            `O sistema sugere atentar para o documento pendente DOC-003 e a identificação do agente na EVD-008. ` +
            `Lembramos que as decisões de mérito permanecem sob a competência exclusiva da autoridade fiscalizatória.`
        }
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: assistantText,
        citations,
        timestamp: new Date().toTimeString().slice(0, 5),
      }

      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    setConversationId(null)
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'assistant',
        text: 'Nova conversa iniciada. Estou pronto para analisar os registros e documentos da fiscalização atual.',
        timestamp: new Date().toTimeString().slice(0, 5),
      },
    ])
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agente Nativo de Apoio Técnico</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">{t('assistant.title')}</h1>
          <p className="text-xs text-[#5B6B63]">
            Análise orientada por evidências, rastreabilidade e identificação cautelosa de
            pendências.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNewChat}
          className="h-9 text-xs border-[#E2E8E4] flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('assistant.new_chat')}</span>
        </Button>
      </div>

      {/* Suggested Command Chips */}
      <div className="rounded-2xl border border-[#E2E8E4] bg-white p-4 shadow-xs space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B63]">
          {t('assistant.suggested_title')}
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleSend(cmd)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#F7F9F8] border border-[#E2E8E4] text-[#143028] hover:border-[#1B5E3A] hover:bg-[#E7F2EC] hover:text-[#1B5E3A] transition-all text-left"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="rounded-3xl border border-[#E2E8E4] bg-white shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isBot = m.sender === 'assistant'
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-2xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isBot ? 'bg-[#1B5E3A] text-white shadow-xs' : 'bg-[#143028] text-white'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? 'bg-[#F7F9F8] text-[#143028] border border-[#E2E8E4]'
                        : 'bg-[#1B5E3A] text-white'
                    }`}
                  >
                    {m.text}
                  </div>
                  <div
                    className={`text-[10px] text-[#5B6B63] px-1 ${
                      isBot ? 'text-left' : 'text-right'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            )
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#5B6B63] p-2">
              <Bot className="w-4 h-4 text-[#1B5E3A] animate-spin" />
              <span>Analisando registros de campo...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-[#E2E8E4] p-3 sm:p-4 bg-white space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('assistant.placeholder')}
              className="h-10 text-xs border-[#E2E8E4] focus-visible:ring-[#1B5E3A]"
            />
            <Button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="bg-[#1B5E3A] hover:bg-[#14502F] text-white text-xs font-semibold h-10 px-4 rounded-lg shadow-xs shrink-0"
            >
              <Send className="w-3.5 h-3.5 mr-1" />
              <span>{t('assistant.send')}</span>
            </Button>
          </form>

          {/* Mandatory Fixed Disclaimer */}
          <p className="text-[10px] text-center text-[#5B6B63] italic">
            {t('assistant.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  )
}
export default AssistantChat
