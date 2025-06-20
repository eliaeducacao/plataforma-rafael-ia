import { RefObject } from "react"
import ChatBreadcrumb from "./breadcrumb"
import Message from "./message"
import NewMessageInput from "./new-message-input"
import type { Chat, Message as MessageType } from "../types"

interface ChatWindowProps {
  // Dados
  chat?: Chat | null
  localMessages: MessageType[]
  messagesEndRef: RefObject<HTMLDivElement | null>

  // Handlers
  onUpdateChat?: (threadId: string, messages: MessageType[]) => void

  // Props para o input
  messageInput: string
  onMessageInputChange: (value: string) => void
  onSubmitMessage: (e: React.FormEvent) => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onInputResize: (e: React.FormEvent<HTMLTextAreaElement>) => void

  // Props para navegação
  onNavigateToAgents: () => void
}

export function ChatWindow({
  chat,
  localMessages,
  messagesEndRef,
  messageInput,
  onMessageInputChange,
  onSubmitMessage,
  onKeyPress,
  onInputResize,
  onNavigateToAgents
}: ChatWindowProps) {
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

  return (
    <div className="flex-1 flex flex-col bg-background h-full w-full overflow-hidden">
      {/* Breadcrumb */}
      <header className="flex-shrink-0 w-full border-b">
        <ChatBreadcrumb
          agentName="Agentes"
          onNavigateToAgents={onNavigateToAgents}
        />
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
        <NewMessageInput
          value={messageInput}
          onChange={onMessageInputChange}
          onSubmit={onSubmitMessage}
          onKeyPress={onKeyPress}
          onInputResize={onInputResize}
        />
      </footer>
    </div>
  )
}