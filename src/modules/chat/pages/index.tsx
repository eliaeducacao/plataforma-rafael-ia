import { useChatModel } from "./chat.model";
import { ChatView } from "./chat.view";
import { useParams } from "wouter";

export default function ChatPage() {
  const params = useParams()
  const chatId = params.chatId || undefined
  
  const methods = useChatModel({ chatId })

  return <ChatView {...methods} />
}