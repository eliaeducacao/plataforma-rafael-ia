import { User, Bot } from "lucide-react"
import type { Message as MessageType } from "../types"
import { Avatar } from "@/shared/components/ui/avatar"
import { cn } from "@/shared/lib/utils"

interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === "human"

  return (
    <div className={cn(
      "flex gap-2 sm:gap-3 group w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 bg-primary text-primary-foreground flex-shrink-0 mt-1">
          <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
        </Avatar>
      )}

      <div className={cn(
        "flex flex-col min-w-0 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]",
        isUser && "items-end"
      )}>
        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm break-words word-wrap transition-colors",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          <p className="leading-relaxed whitespace-pre-wrap break-words">
            {message.message}
          </p>
        </div>

        {/* <div className={cn(
          "text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity px-1",
          isUser ? "text-right" : "text-left"
        )}>
          {message.timestamp}
        </div> */}
      </div>

      {isUser && (
        <Avatar className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 bg-muted text-muted-foreground flex-shrink-0 mt-1">
          <User className="h-3 w-3 sm:h-4 sm:w-4" />
        </Avatar>
      )}
    </div>
  )
} 