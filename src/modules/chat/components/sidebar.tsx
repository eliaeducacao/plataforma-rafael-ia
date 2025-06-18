import { Plus } from "lucide-react"
import type { Thread } from "../types"
import { Button } from "@/shared/components/ui/button"
import { CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { cn } from "@/shared/lib/utils"

interface SidebarProps {
  threads: Thread[]
  selectedThreadId: string
  onSelectThread: (threadId: string) => void
  onNewConversation: () => void
}

export default function Sidebar({
  threads,
  selectedThreadId,
  onSelectThread,
  onNewConversation
}: SidebarProps) {
  return (
    <div className="w-80 bg-background border-r flex flex-col min-h-0 flex-shrink-0">
      {/* Header */}
      <CardHeader className="px-4 sm:px-6 py-4">
        <CardTitle className="text-lg sm:text-xl">Meus Chats</CardTitle>
      </CardHeader>

      <Separator />

      {/* Lista de threads */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="space-y-2">
          {threads.map((thread) => (
            <Button
              key={thread.id}
              variant={selectedThreadId === thread.id ? "secondary" : "ghost"}
              onClick={() => onSelectThread(thread.id)}
              className={cn(
                "w-full justify-start h-auto p-3 text-left",
                selectedThreadId === thread.id && "bg-secondary"
              )}
            >
              <div className="flex flex-col items-start space-y-1 w-full min-w-0">
                <div className="font-medium truncate w-full text-sm sm:text-base">{thread.title}</div>
                <div className="text-xs text-muted-foreground truncate w-full">
                  {thread.messages.length > 0
                    ? `${thread.messages.length} mensagens`
                    : "Conversa vazia"
                  }
                </div>
              </div>
            </Button>
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
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Conversa
        </Button>
      </div>
    </div>
  )
} 