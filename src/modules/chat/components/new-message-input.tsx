import { Send } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Textarea } from "@/shared/components/ui/textarea"

interface NewMessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onInputResize: (e: React.FormEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
}

export default function NewMessageInput({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  onInputResize,
  disabled = false
}: NewMessageInputProps) {
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto w-full">
          <form onSubmit={onSubmit} className="flex gap-2 sm:gap-3 w-full">
            <div className="flex-1 min-w-0">
              <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={onKeyPress}
                onInput={onInputResize}
                placeholder="Digite sua mensagem aqui..."
                className="min-h-[40px] sm:min-h-[44px] resize-none w-full"
                rows={1}
                disabled={disabled}
              />
            </div>

            <Button
              type="submit"
              disabled={!value.trim() || disabled}
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