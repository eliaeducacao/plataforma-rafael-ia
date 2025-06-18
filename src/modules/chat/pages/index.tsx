import { useState } from "react"
import Sidebar from "@/modules/chat/components/sidebar"
import ChatWindow from "@/modules/chat/components/chat-window"
import type { Thread, Agent, Message } from "@/modules/chat/types"

// Mock data para demonstração
const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Agente de Advocacia",
    description: "Especialista em questões jurídicas",
    conversations: []
  },
  {
    id: "2", 
    name: "Agente Financeiro",
    description: "Especialista em análise financeira",
    conversations: []
  },
  {
    id: "3",
    name: "Agente de RH",
    description: "Especialista em recursos humanos",
    conversations: []
  }
]

const mockThreads: Thread[] = [
  {
    id: "1",
    title: "Chat 1",
    agentId: "1",
    messages: [
      {
        id: "1",
        content: "Olá! Como posso ajudá-lo com questões jurídicas hoje?",
        sender: "ai",
        timestamp: "10:30"
      },
      {
        id: "2", 
        content: "Preciso de ajuda para entender os direitos trabalhistas.",
        sender: "user",
        timestamp: "10:31"
      },
      {
        id: "3",
        content: "Claro! Os direitos trabalhistas no Brasil são regulamentados pela CLT (Consolidação das Leis do Trabalho). Posso explicar pontos específicos que você gostaria de entender melhor?",
        sender: "ai",
        timestamp: "10:32"
      }
    ]
  },
  {
    id: "2",
    title: "Chat 2", 
    agentId: "2",
    messages: [
      {
        id: "4",
        content: "Olá! Sou seu assistente financeiro. Em que posso ajudá-lo?",
        sender: "ai",
        timestamp: "14:20"
      },
      {
        id: "5",
        content: "Gostaria de analisar meus investimentos.",
        sender: "user", 
        timestamp: "14:21"
      }
    ]
  },
  {
    id: "3",
    title: "Análise de Contratos",
    agentId: "1", 
    messages: [
      {
        id: "6",
        content: "Preciso revisar um contrato de prestação de serviços.",
        sender: "user",
        timestamp: "09:15"
      }
    ]
  }
]

export default function ChatPage() {
  const [threads, setThreads] = useState<Thread[]>(mockThreads)
  const [selectedThreadId, setSelectedThreadId] = useState<string>("1")
  const [agents] = useState<Agent[]>(mockAgents)

  const selectedThread = threads.find(thread => thread.id === selectedThreadId)
  const selectedAgent = selectedThread ? agents.find(agent => agent.id === selectedThread.agentId) : undefined

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId)
  }

  const handleNewConversation = () => {
    // TODO: Futura integração com API OpenAI - criar nova thread
    const newThread: Thread = {
      id: Date.now().toString(),
      title: `Chat ${threads.length + 1}`,
      agentId: "1", // Padrão para Agente de Advocacia
      messages: []
    }
    
    setThreads(prev => [...prev, newThread])
    setSelectedThreadId(newThread.id)
  }

  const handleUpdateThread = (threadId: string, messages: Message[]) => {
    setThreads(prev => 
      prev.map(thread => 
        thread.id === threadId 
          ? { ...thread, messages }
          : thread
      )
    )
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - Lista de threads */}
      <Sidebar
        threads={threads}
        selectedThreadId={selectedThreadId}
        onSelectThread={handleSelectThread}
        onNewConversation={handleNewConversation}
      />
      
      {/* ChatWindow - Conversa principal - Força re-render com key */}
      <ChatWindow
        key={selectedThreadId} // Force re-render quando mudamos de thread
        thread={selectedThread}
        agent={selectedAgent}
        onUpdateThread={handleUpdateThread}
      />
    </div>
  )
}