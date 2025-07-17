import { useChatModel } from "./chat.model"
import { ChatWindow } from "../components/chat-window"
import { Sidebar } from "../components/sidebar"
import { Button } from "@/shared/components/ui/button"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { useState } from 'react';

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
    isLoadingMessages,
    chatsError,
    messagesError,
    isCreatingChat,
    isSendingMessage,
    // Props de arquivo
    selectedFile,
    isConvertingFile,
    handleFileSelect,
    handleFileRemove,
    // Props de áudio
    handleAudioRecorded,
    isLoadingChats,
    deleteChatMutation,
    updateChatTitleMutation
  } = props

  const [editingChatId, setEditingChatId] = useState<string | null>(null);

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

  // Handlers para deleção e edição de título
  const handleDeleteChat = (chatId: string) => {
    deleteChatMutation.mutate(chatId)
  }

  const handleUpdateChatTitle = (chatId: string, title: string) => {
    return updateChatTitleMutation.mutateAsync({ chatId, title })
  }

  const handleStartEditChat = (chatId: string) => setEditingChatId(chatId);
  const handleStopEditChat = () => setEditingChatId(null);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - Lista de threads */}
      {selectedAgentId ? (
        <>
          {isLoadingChats ? (
            <div className="w-[300px] bg-background border-r flex-shrink-0 animate-pulse">
              <div className="p-4">
                <div className="h-8 bg-muted rounded mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-muted rounded" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Sidebar
              chats={chats}
              messages={messages}
              selectedChatId={selectedChatId}
              onSelectChat={handleSelectChat}
              onNewConversation={handleNewConversation}
              onDeleteChat={handleDeleteChat}
              onUpdateChatTitle={handleUpdateChatTitle}
              editingChatId={editingChatId}
              onStartEditChat={handleStartEditChat}
              onStopEditChat={handleStopEditChat}
              updateChatTitleMutation={updateChatTitleMutation}
              isCreatingChat={isCreatingChat}
            />
          )}

          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatWindow
              key={selectedChatId}
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
            />
          </div>
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