import { useEffect, useRef, useState } from "react"
import ChatBreadcrumb from "./breadcrumb"
import Message from "./message"
import NewMessageInput from "./new-message-input"
import type { Chat, Message as MessageType } from "../types"

interface ChatWindowProps {
  chat?: Chat | null
  message?: MessageType
  onUpdateChat?: (threadId: string, messages: MessageType[]) => void
}

export function ChatWindow({ chat, message, onUpdateChat }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [localMessages, setLocalMessages] = useState<MessageType[]>([])

  // Sincronizar mensagens locais com a thread atual
  useEffect(() => {
    if (message) {
      setLocalMessages((prev) => [...prev, message])
    } else {
      setLocalMessages([])
    }
  }, [message])

  // Scroll automático até o final da conversa
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [localMessages])

  // Reset scroll position quando mudamos de thread
  useEffect(() => {
    if (chat) {
      // Pequeno delay para garantir que as mensagens foram renderizadas
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
      }, 100)
    }
  }, [chat?._id, chat])

  if (!chat) {
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
      message: content,
      role: "human",
    }

    // TODO: Fazer a chamada API https://api.eliaeducacao.com.br/webhook/3667f47c-418a-41c7-98ae-3f97d6468e84/api/v1/chats/:chat_id/messages e pegar o campo output para definir a mensagem da IA

    // Simular resposta do agente após um delay
    const aiMessage: MessageType = {
      message: content +
        " messagem de ia",
      role: "ai",
    }

    // Atualizar mensagens localmente
    const newMessages = [...localMessages, userMessage]
    setLocalMessages(newMessages)


    // Simular delay da resposta da IA
    setTimeout(() => {
      const finalMessages = [...newMessages, aiMessage]
      setLocalMessages(finalMessages)

      // Notificar o componente pai sobre a atualização
      if (onUpdateChat) {
        onUpdateChat(chat._id, finalMessages)
      }
    }, 1000)
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full w-full overflow-hidden">
      {/* Breadcrumb */}
      <header className="flex-shrink-0 w-full border-b">
        <ChatBreadcrumb agentName={"Agentes"} />
      </header>

      {/* Área de mensagens */}
      <main className="flex-1 overflow-y-auto w-full">
        {localMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full px-4">
            <div className="text-center max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-medium mb-2">Conversa vazia</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Envie uma mensagem para começar a conversar com o agente.</p>
            </div>
          </div>
        ) : (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="max-w-4xl mx-auto w-full">
              <div className="space-y-3 sm:space-y-4">
                {localMessages.map((message, index) => (
                  <Message key={index} message={message} />
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