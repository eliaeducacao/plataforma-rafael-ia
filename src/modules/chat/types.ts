export interface Message {
    id: string
    content: string
    sender: "user" | "ai"
    timestamp: string
    chart?: boolean
    report?: boolean
  }
  
  export interface Conversation {
    id: string
    title: string
    messages: Message[]
  }
  
  export interface Thread {
    id: string
    title: string
    agentId: string
    messages: Message[]
  }
  
  export interface Agent {
    id: string
    name: string
    description: string
    conversations: Conversation[]
    activeConversation?: string
  }
  
  export interface Department {
    id: string
    name: string
    description: string
    agents: Agent[]
  }
  
  export interface Report {
    id: string
    title: string
    date: string
    author: string
    category: string
    department: string
    type: "maintenance" | "chart" | "table" | "document"
    description: string
  }
  
  