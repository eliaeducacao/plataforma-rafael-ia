"use client"

import { useState } from "react"
import { ChevronLeft, MessageSquare, User, X } from "lucide-react"
import type { Agent } from "@/modules/chat/types"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/components/ui/sidebar"
import { Button } from "@/shared/components/ui/button"

interface ConversationSidebarProps {
  agent: Agent | null
  onBack: () => void
  onSelectConversation: (agent: Agent, conversationId: string) => void
}

export default function ConversationSidebar({ agent, onBack, onSelectConversation }: ConversationSidebarProps) {
  const [newConversationMode, setNewConversationMode] = useState(false)

  if (!agent) {
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Selecione um agente para ver as conversas</p>
          </div>
        </SidebarHeader>
      </Sidebar>
    )
  }

  const handleNewConversation = () => {
    // Criar uma nova conversa com ID temporário
    const newAgent = {
      ...agent,
      activeConversation: undefined,
    }
    onSelectConversation(newAgent, "new")
    setNewConversationMode(false)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">{agent.name}</h2>
            <div className="w-8"></div> {/* Espaçador para alinhamento */}
          </div>
          <p className="text-xs text-muted-foreground">{agent.description}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 py-2">
          <Button variant="outline" className="w-full mb-3" onClick={() => setNewConversationMode(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Nova conversa
          </Button>

          {newConversationMode && (
            <div className="mb-3 p-3 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Nova conversa</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setNewConversationMode(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={handleNewConversation}>
                Iniciar
              </Button>
            </div>
          )}

          <div className="text-xs font-medium text-muted-foreground mb-2 mt-4">HISTÓRICO DE CONVERSAS</div>
        </div>
        <SidebarMenu>
          {agent.conversations.map((conversation) => (
            <SidebarMenuItem key={conversation.id}>
              <SidebarMenuButton
                isActive={agent.activeConversation === conversation.id}
                onClick={() => onSelectConversation(agent, conversation.id)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>{conversation.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3 border-t">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            <div>
              <p className="text-sm font-medium">Logado como</p>
              <p className="text-xs text-muted-foreground">usuario@empresa.com</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
