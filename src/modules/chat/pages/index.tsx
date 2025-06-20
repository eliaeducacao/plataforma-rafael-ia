import { useChatModel } from "./chat.model";
import { ChatView } from "./chat.view";

export default function ChatPage() {
  const methods = useChatModel()

  return <ChatView {...methods} />
}