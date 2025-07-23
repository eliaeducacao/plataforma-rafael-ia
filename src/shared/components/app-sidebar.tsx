import * as React from "react"
import {
  // IconCamera,
  // IconChartBar,
  // IconDatabase,
  // IconFileAi,
  // IconFileDescription,
  // IconFileWord,
  // IconFolder,
  // IconInnerShadowTop,
  // IconReport,
  // IconUsers,
  // IconDashboard,
  IconHelp,
  IconListDetails,
  // IconSettings,
} from "@tabler/icons-react"

import { NavMain } from "@/shared/components/nav-main"
import { NavSecondary } from "@/shared/components/nav-secondary"
import { NavUser } from "@/shared/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/shared/components/ui/sidebar"
import { Scale, Plus, Loader2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { ChatItem } from "@/modules/chat/components/chat-item"
import type { Chat } from "@/modules/chat/types"
import { UseMutationResult } from '@tanstack/react-query'

const data = {
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "#",
    //   icon: IconDashboard,
    // },
    {
      title: "Biblioteca de Agentes",
      url: "/agents",
      icon: IconListDetails,
    },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Projects",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  navSecondary: [
    // {
    //   title: "Configurações",
    //   url: "#settings",
    //   icon: IconSettings,
    // },
    {
      title: "Preciso de ajuda",
      url: "https://wa.me/5511913337009",
      icon: IconHelp,
    }
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string
    email: string
    avatar: string
  }
  onLogout: () => void
  // Props para chat
  chats?: Chat[] | null
  selectedChatId?: string | null
  selectedAgentId?: string | null
  onSelectChat?: (chatId: string) => void
  onNewConversation?: () => void
  onDeleteChat?: (chatId: string) => void
  onUpdateChatTitle?: (chatId: string, title: string) => Promise<unknown> | void
  editingChatId?: string | null
  onStartEditChat?: (chatId: string) => void
  onStopEditChat?: () => void
  updateChatTitleMutation?: UseMutationResult<Chat, unknown, { chatId: string; title: string }, unknown>
  isCreatingChat?: boolean
  isLoadingChats?: boolean
}

export function AppSidebar({ 
  user, 
  onLogout,
  chats,
  selectedChatId,
  selectedAgentId,
  onSelectChat,
  onNewConversation,
  onDeleteChat,
  onUpdateChatTitle,
  editingChatId,
  onStartEditChat,
  onStopEditChat,
  updateChatTitleMutation,
  isCreatingChat = false,
  isLoadingChats = false,
  ...props 
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="flex items-center h-full space-x-1.5">
                <div className="flex items-center justify-center w-7 h-7 bg-primary rounded-lg">
                  <Scale className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold font-playfair">EliaAI</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
        {/* Seção de Chats - Sempre presente */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2 py-1">
            Meus Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {!selectedAgentId ? (
              <div className="px-2 py-3">
                <p className="text-xs text-muted-foreground text-center">
                  Selecione um agente para ver suas conversas
                </p>
              </div>
            ) : isLoadingChats ? (
              <div className="px-2 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                <SidebarMenu>
                  {chats?.map((chat) => (
                    <ChatItem
                      key={chat._id}
                      chat={chat}
                      isSelected={selectedChatId === chat._id}
                      onSelect={onSelectChat!}
                      onDelete={onDeleteChat!}
                      onUpdateTitle={onUpdateChatTitle!}
                      isEditing={editingChatId === chat._id}
                      onStartEdit={() => onStartEditChat!(chat._id)}
                      onStopEdit={onStopEditChat!}
                      isUpdatingTitle={(updateChatTitleMutation?.isPending ?? false) && editingChatId === chat._id}
                      isUpdateSuccess={(updateChatTitleMutation?.isSuccess ?? false) && editingChatId === chat._id}
                      resetMutation={updateChatTitleMutation?.reset!}
                    />
                  ))}
                </SidebarMenu>
                
                {/* Botão Nova Conversa */}
                <div className="px-2 pt-2">
                  <Button
                    onClick={onNewConversation}
                    variant="outline"
                    className="w-full"
                    size="sm"
                    disabled={isCreatingChat}
                  >
                    {isCreatingChat ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-3 w-3" />
                        Nova Conversa
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
        
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
