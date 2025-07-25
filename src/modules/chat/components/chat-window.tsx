import { RefObject } from "react"
import ChatBreadcrumb from "./breadcrumb"
import { default as MessageComponent } from "./message"
import NewMessageInput from "./new-message-input"
import type { Chat, Message as MessageType } from "../types"
import type { SubmitData } from "../pages/chat.model"
import type { FileWithId } from "./multi-file-upload"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { Loader2 } from "lucide-react"

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
  onSubmitMessage: (data: SubmitData) => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onInputResize: (e: React.FormEvent<HTMLTextAreaElement>) => void

  // Props para arquivos múltiplos
  selectedFiles?: FileWithId[]
  isConvertingFiles?: boolean
  onFilesSelect: (files: FileWithId[]) => void
  onFileRemove: (fileId: string) => void

  // Props para áudio
  onAudioRecorded?: (audioBlob: Blob) => void

  // Props para navegação
  onNavigateToAgents: () => void

  // Props para loading e error
  isLoadingMessages?: boolean
  messagesError?: Error | null
  isSendingMessage?: boolean

  // Props para agente
  currentAgent?: { title: string } | null
  isLoadingAgent?: boolean
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
  onNavigateToAgents,
  isLoadingMessages = false,
  messagesError,
  isSendingMessage = false,
  selectedFiles = [],
  isConvertingFiles = false,
  onFilesSelect,
  onFileRemove,
  onAudioRecorded,
  currentAgent,
  isLoadingAgent = false
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

  // Loading skeleton para mensagens
  const MessagesSkeleton = () => (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex gap-2 sm:gap-3 w-full ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col min-w-0 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]">
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col bg-background h-full w-full overflow-hidden">
      {/* Breadcrumb */}
      <header className="flex-shrink-0 w-full border-b">
        <ChatBreadcrumb
          agentName={currentAgent?.title || "Agentes"}
          onNavigateToAgents={onNavigateToAgents}
          isLoading={isLoadingAgent}
        />
      </header>

      {/* Área de mensagens */}
      <main className="flex-1 overflow-y-auto w-full">
        {messagesError ? (
          <div className="flex items-center justify-center h-full w-full px-4">
            <div className="text-center max-w-md mx-auto">
              <Alert variant="destructive">
                <AlertDescription>
                  Erro ao carregar mensagens. Tente novamente.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        ) : isLoadingMessages ? (
          <MessagesSkeleton />
        ) : (!localMessages || !Array.isArray(localMessages) || localMessages.length === 0) ? (
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
                {(localMessages && Array.isArray(localMessages) ? localMessages : []).map((message, index) => (
                  <MessageComponent key={index} message={message} />
                ))}

                {/* Indicador de que está enviando mensagem */}
                {isSendingMessage && (
                  <div className="flex gap-2 sm:gap-3 w-full justify-start">
                    <div className="flex flex-col min-w-0 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]">
                      <div className="rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Enviando...</span>
                      </div>
                    </div>
                  </div>
                )}
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
          disabled={isSendingMessage}
          selectedFiles={selectedFiles}
          isConverting={isConvertingFiles}
          onFilesSelect={onFilesSelect}
          onFileRemove={onFileRemove}
          onAudioRecorded={onAudioRecorded}
        />
      </footer>
    </div>
  )
}