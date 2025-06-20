import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Textarea } from "@/shared/components/ui/textarea"

interface NewMessageInputProps {
  onSendMessage: (content: string) => void
}

export default function NewMessageInput({ onSendMessage }: NewMessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 w-full">
            <div className="flex-1 min-w-0">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem aqui..."
                className="min-h-[40px] sm:min-h-[44px] resize-none w-full"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "40px"
                  target.style.height = `${Math.min(target.scrollHeight, 200)}px`
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={!message.trim()}
              size="icon"
              className="h-10 w-10 sm:h-11 sm:w-11 shrink-0"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensagem</span>
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            Pressione Enter para enviar, Shift+Enter para nova linha
          </p>
        </div>
      </div>
    </div>
  )
} 