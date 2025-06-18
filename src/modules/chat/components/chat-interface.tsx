"use client"

import { useState } from "react"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import ConversationSidebar from "./conversation-sidebar"
import ChatArea from "./chat-area"
import { DashboardView } from "@/modules/chat/components/dashboard-view"
import type { Agent, Department } from "@/modules/chat/types"
import { departments } from "@/shared/lib/data"

export default function ChatInterface() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [currentDepartments] = useState<Department[]>(departments)
  const [currentView, setCurrentView] = useState<"chat" | "dashboard">("dashboard")

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setCurrentView("chat")
  }

  const handleBackToDashboard = () => {
    setSelectedAgent(null)
    setCurrentView("dashboard")
  }

  const handleSelectConversation = (agent: Agent, conversationId: string) => {
    setSelectedAgent({
      ...agent,
      activeConversation: conversationId,
    })
  }

  return (
    <SidebarProvider>
      <div className="flex h-full w-full bg-background">
        {currentView === "chat" && (
          <ConversationSidebar
            agent={selectedAgent}
            onBack={handleBackToDashboard}
            onSelectConversation={handleSelectConversation}
          />
        )}

        <div className="flex-1 overflow-hidden">
          {currentView === "dashboard" && (
            <DashboardView departments={currentDepartments} onSelectAgent={handleSelectAgent} />
          )}

          {currentView === "chat" && <ChatArea agent={selectedAgent} />}
        </div>
      </div>
    </SidebarProvider>
  )
}

