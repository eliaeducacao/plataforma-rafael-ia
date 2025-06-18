import { useEffect, useRef, useState } from "react"
import ChatBreadcrumb from "./breadcrumb"
import Message from "./message"
import NewMessageInput from "./new-message-input"
import type { Thread, Agent, Message as MessageType } from "../types"

interface ChatWindowProps {
  thread?: Thread
  agent?: Agent
  onUpdateThread?: (threadId: string, messages: MessageType[]) => void
}

export default function ChatWindow({ thread, agent, onUpdateThread }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [localMessages, setLocalMessages] = useState<MessageType[]>([])

  // Sincronizar mensagens locais com a thread atual
  useEffect(() => {
    if (thread) {
      setLocalMessages(thread.messages)
    } else {
      setLocalMessages([])
    }
  }, [thread])

  // Scroll automático até o final da conversa
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [localMessages])

  // Reset scroll position quando mudamos de thread
  useEffect(() => {
    if (thread) {
      // Pequeno delay para garantir que as mensagens foram renderizadas
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
      }, 100)
    }
  }, [thread?.id])

  if (!thread || !agent) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background h-full w-full overflow-hidden">
        <div className="text-center px-4 max-w-md mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Selecione uma conversa</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Escolha uma conversa na barra lateral ou crie uma nova para começar.</p>
        </div>
      </div>
    )
  }

  const handleSendMessage = (content: string) => {
    // Criar mensagem do usuário
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("pt-BR", { 
        hour: "2-digit", 
        minute: "2-digit" 
      })
    }

    // Simular resposta do agente após um delay
    const aiMessage: MessageType = {
      id: (Date.now() + 1).toString(),
      content: generateMockResponse(content, agent.name),
      sender: "ai",
      timestamp: new Date().toLocaleTimeString("pt-BR", { 
        hour: "2-digit", 
        minute: "2-digit" 
      })
    }

    // Atualizar mensagens localmente
    const newMessages = [...localMessages, userMessage]
    setLocalMessages(newMessages)
    
    // TODO: Futura integração com API OpenAI - enviar mensagem real
    console.log("Mensagem enviada:", content)
    console.log("Thread ID:", thread.id)
    console.log("Agent ID:", agent.id)

    // Simular delay da resposta da IA
    setTimeout(() => {
      const finalMessages = [...newMessages, aiMessage]
      setLocalMessages(finalMessages)
      
      // Notificar o componente pai sobre a atualização
      if (onUpdateThread) {
        onUpdateThread(thread.id, finalMessages)
      }
    }, 1000)
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full w-full overflow-hidden">
      {/* Breadcrumb */}
      <header className="flex-shrink-0 w-full border-b">
        <ChatBreadcrumb agentName={agent.name} />
      </header>

      {/* Área de mensagens */}
      <main className="flex-1 overflow-y-auto w-full">
        {localMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full px-4">
            <div className="text-center max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-medium mb-2">Conversa vazia</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Envie uma mensagem para começar a conversar com o {agent.name}.</p>
            </div>
          </div>
        ) : (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="max-w-4xl mx-auto w-full">
              <div className="space-y-3 sm:space-y-4">
                {localMessages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </div>
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
        )}
      </main>

      {/* Input de nova mensagem */}
      <footer className="flex-shrink-0 w-full border-t">
        <NewMessageInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  )
}

// Função para gerar respostas mockadas baseadas no agente
function generateMockResponse(userMessage: string, agentName: string): string {
  const responses = {
    "Agente de Advocacia": [
      "Entendo sua questão jurídica. Vou analisar os aspectos legais relevantes e fornecer orientações adequadas.",
      "Baseado na legislação brasileira, posso ajudá-lo com essa questão. Preciso de mais detalhes para dar uma orientação mais específica.",
      "Essa é uma questão interessante do ponto de vista jurídico. Vou explicar os direitos e deveres aplicáveis ao seu caso.",
    ],
    "Agente Financeiro": [
      "Vou analisar sua situação financeira e fornecer recomendações adequadas ao seu perfil de investidor.",
      "Entendo suas necessidades financeiras. Posso ajudá-lo a otimizar seus investimentos e planejamento financeiro.",
      "Essa é uma boa estratégia financeira. Vou explicar as opções disponíveis e os riscos envolvidos.",
    ],
    "Agente de RH": [
      "Compreendo sua questão sobre recursos humanos. Vou fornecer orientações sobre políticas e melhores práticas.",
      "Essa questão é importante para a gestão de pessoas. Posso ajudá-lo com estratégias eficazes de RH.",
      "Vou analisar essa situação do ponto de vista organizacional e sugerir as melhores práticas.",
    ]
  }

  const agentResponses = responses[agentName as keyof typeof responses] || responses["Agente de Advocacia"]
  return agentResponses[Math.floor(Math.random() * agentResponses.length)] || "Entendo sua questão. Como posso ajudá-lo melhor?"
}