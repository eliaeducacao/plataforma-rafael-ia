import { useChatModel } from "./chat.model"
import { ChatWindow } from "../components/chat-window"
import { Sidebar } from "../components/sidebar"
import { Button } from "@/shared/components/ui/button"

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
    handleNavigateToAgents
  } = props

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - Lista de threads */}
      {selectedAgentId ? (
        <>
          <Sidebar
            chats={chats}
            messages={messages}
            selectedChatId={selectedChatId}
            onSelectChat={handleSelectChat}
            onNewConversation={handleNewConversation}
          />

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