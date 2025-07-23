import { useChatModel } from "./chat.model"
import { ChatWindow } from "../components/chat-window"
import { Button } from "@/shared/components/ui/button"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"

export function ChatView(props: ReturnType<typeof useChatModel>) {
  const {
    selectedChat,
    handleUpdateThread,
    selectedAgentId,
    localMessages,
    messagesEndRef,
    messageInput,
    handleMessageInputChange,
    handleSubmitMessage,
    handleKeyPress,
    handleInputResize,
    handleNavigateToAgents,
    isLoadingMessages,
    messagesError,
    isSendingMessage,
    // Props de arquivo
    selectedFile,
    isConvertingFile,
    handleFileSelect,
    handleFileRemove,
    // Props de áudio
    handleAudioRecorded,
    // Dados do agente
    currentAgent,
    isLoadingAgent
  } = props

  // Error state para mensagens
  if (messagesError) {
    return (
      <div className="flex h-screen w-full bg-background overflow-hidden items-center justify-center">
        <div className="max-w-md mx-auto p-4">
          <Alert variant="destructive">
            <AlertDescription>
              Erro ao carregar mensagens. Tente novamente.
            </AlertDescription>
          </Alert>
          <Button onClick={handleNavigateToAgents} className="w-full mt-4">
            Voltar para Agentes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Chat Window - visível quando há conversa selecionada */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow
            key={selectedChat._id}
            chat={selectedChat}
            localMessages={localMessages}
            messagesEndRef={messagesEndRef}
            messageInput={messageInput}
            onMessageInputChange={handleMessageInputChange}
            onSubmitMessage={handleSubmitMessage}
            onKeyPress={handleKeyPress}
            onInputResize={handleInputResize}
            onNavigateToAgents={handleNavigateToAgents}
            onUpdateChat={handleUpdateThread}
            isLoadingMessages={isLoadingMessages}
            messagesError={messagesError}
            isSendingMessage={isSendingMessage}
            selectedFile={selectedFile}
            isConvertingFile={isConvertingFile}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onAudioRecorded={handleAudioRecorded}
            currentAgent={currentAgent}
            isLoadingAgent={isLoadingAgent}
          />
        </div>
      ) : selectedAgentId ? (
        /* Agente selecionado, mas nenhuma conversa */
        <div className="flex-1 flex items-center justify-center bg-background h-full w-full">
          <div className="text-center px-4 max-w-md mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Nenhuma conversa selecionada</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-4">
              Selecione uma conversa na barra lateral ou crie uma nova para começar.
            </p>
          </div>
        </div>
      ) : (
        /* Nenhum agente selecionado */
        <div className="flex-1 flex items-center justify-center bg-background h-full w-full">
          <div className="text-center px-4 max-w-md mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Selecione um agente</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-4">
              Você precisa selecionar um agente antes de iniciar uma conversa.
            </p>
            <Button onClick={handleNavigateToAgents} className="w-full sm:w-auto">
              Voltar para Agentes
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}