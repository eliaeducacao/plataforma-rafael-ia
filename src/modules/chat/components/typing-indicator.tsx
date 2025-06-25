import { Bot } from "lucide-react"
import { Avatar } from "@/shared/components/ui/avatar"

export default function TypingIndicator() {
  return (
    <div className="flex gap-2 sm:gap-3 group w-full justify-start">
      <Avatar className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 bg-primary text-primary-foreground flex-shrink-0 mt-1">
        <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
      </Avatar>

      <div className="flex flex-col min-w-0 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]">
        <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 