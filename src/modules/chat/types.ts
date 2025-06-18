export interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
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