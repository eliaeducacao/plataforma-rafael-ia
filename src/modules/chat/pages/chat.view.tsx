import { useChatModel } from "./chat.model"
import { ChatWindow } from "../components/chat-window"
import { Sidebar } from "../components/sidebar"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"

export function ChatView(props: ReturnType<typeof useChatModel>) {
  const {
    chats,
    selectedChatId,
    handleNewConversation,
    handleSelectChat,
    selectedChat,
    handleUpdateThread,
    messages,
    selectedAgentId,
    localMessages,
    messagesEndRef,
    messageInput,
    handleMessageInputChange,
    handleSubmitMessage,
    handleKeyPress,
    handleInputResize,
    handleNavigateToAgents,
    isLoadingChats,
    isLoadingMessages,
    chatsError,
    messagesError,
    isCreatingChat,
    isSendingMessage,
    // Props de arquivo
    selectedFile,
    isConvertingFile,
    handleFileSelect,
    handleFileRemove
  } = props

  // Loading skeleton para a sidebar
  const SidebarSkeleton = () => (
    <div className="w-80 bg-background border-r flex flex-col min-h-0 flex-shrink-0 p-4">
      <Skeleton className="h-8 w-32 mb-4" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )

  // Error state para chats
  if (chatsError) {
    return (
      <div className="flex h-screen w-full bg-background overflow-hidden items-center justify-center">
        <div className="max-w-md mx-auto p-4">
          <Alert variant="destructive">
            <AlertDescription>
              Erro ao carregar chats. Tente novamente.
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
      {/* Sidebar - Lista de threads */}
      {selectedAgentId ? (
        <>
          {isLoadingChats ? (
            <SidebarSkeleton />
          ) : (
            <Sidebar
              chats={chats}
              messages={messages}
              selectedChatId={selectedChatId}
              onSelectChat={handleSelectChat}
              onNewConversation={handleNewConversation}
              isCreatingChat={isCreatingChat}
            />
          )}

          <ChatWindow
            key={selectedChatId} // Force re-render quando mudamos de thread
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
          />
        </>
      ) : (
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