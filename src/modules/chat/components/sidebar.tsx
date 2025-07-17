import { Plus, Loader2, Menu } from "lucide-react"
import type { Chat, Message } from "../types"
import { Button } from "@/shared/components/ui/button"
import { CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { ChatItem } from './chat-item'
import { UseMutationResult } from '@tanstack/react-query';

interface SidebarProps {
  chats: Chat[] | null
  messages: Message[] | null
  selectedChatId: string | null
  onSelectChat: (chatId: string) => void
  onNewConversation: () => void
  onDeleteChat: (chatId: string) => void
  onUpdateChatTitle: (chatId: string, title: string) => Promise<unknown> | void
  editingChatId: string | null
  onStartEditChat: (chatId: string) => void
  onStopEditChat: () => void
  updateChatTitleMutation: UseMutationResult<Chat, unknown, { chatId: string; title: string }, unknown>
  isCreatingChat?: boolean
}

const SidebarContent = ({
  chats,
  selectedChatId,
  onSelectChat,
  onNewConversation,
  onDeleteChat,
  onUpdateChatTitle,
  editingChatId,
  onStartEditChat,
  onStopEditChat,
  updateChatTitleMutation,
  isCreatingChat = false
}: Omit<SidebarProps, "messages">) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <CardHeader className="px-4 sm:px-6 py-4">
        <CardTitle className="text-lg sm:text-xl">Meus Chats</CardTitle>
      </CardHeader>

      <Separator />

      {/* Lista de threads */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="space-y-2">
          {chats?.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              isSelected={selectedChatId === chat._id}
              onSelect={onSelectChat}
              onDelete={onDeleteChat}
              onUpdateTitle={onUpdateChatTitle}
              isEditing={editingChatId === chat._id}
              onStartEdit={() => onStartEditChat(chat._id)}
              onStopEdit={onStopEditChat}
              isUpdatingTitle={updateChatTitleMutation.isPending && editingChatId === chat._id}
              isUpdateSuccess={updateChatTitleMutation.isSuccess && editingChatId === chat._id}
              resetMutation={updateChatTitleMutation.reset}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Botão Nova Conversa */}
      <div className="p-4 flex-shrink-0">
        <Button
          onClick={onNewConversation}
          className="w-full"
          size="lg"
          disabled={isCreatingChat}
        >
          {isCreatingChat ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conversa
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      {/* Versão Mobile - Sheet */}
      <Sheet>
        <SheetTrigger asChild className="fixed top-4 left-4 z-50 md:hidden">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[80vw] sm:w-[300px] p-0 border-r"
        >
          <SidebarContent {...props} />
        </SheetContent>
      </Sheet>

      {/* Versão Desktop - Sidebar Fixa */}
      <div className="hidden md:block w-[300px] bg-background border-r flex-shrink-0">
        <SidebarContent {...props} />
      </div>
    </>
  )
} 