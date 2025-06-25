import { User, Bot } from "lucide-react"
import type { Message as MessageType } from "../types"
import { Avatar } from "@/shared/components/ui/avatar"
import { cn } from "@/shared/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import '@/shared/styles/markdown.css'
import { useTypewriter } from "../hooks/use-typewriter"
import { memo } from 'react'

interface MessageProps {
  message: MessageType
}

const Message = memo(function Message({ message }: MessageProps) {
  const isUser = message.role === "human"

  // Usar typewriter apenas para mensagens do bot que estão em streaming
  const shouldUseTypewriter = !isUser && message.isStreaming === true

  const [typedText] = useTypewriter({
    text: message.message,
    speed: 5,
    enabled: shouldUseTypewriter
  })

  // Decidir qual texto mostrar
  const displayText = shouldUseTypewriter ? typedText : message.message

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
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // Customizar componentes para melhor integração
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="mb-2 last:mb-0 pl-4 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="mb-2 last:mb-0 pl-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-border pl-4 italic my-2 opacity-80">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children, ...props }) => {
                  return (
                    <code
                      className={cn(
                        "font-mono text-xs",
                        // Se não está dentro de um pre, é inline
                        !className ? "px-1.5 py-0.5 rounded bg-background text-foreground border" : "",
                        className
                      )}
                      {...props}
                    >
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="bg-background border rounded-md overflow-x-auto my-2 max-w-full">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-2">
                    <table className="min-w-full border-collapse border border-border rounded-md">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-border px-2 py-1 bg-background font-semibold text-left text-xs">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-border px-2 py-1 text-xs">
                    {children}
                  </td>
                ),
                // Links seguros
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "underline hover:opacity-80 transition-opacity",
                      isUser ? "text-primary-foreground" : "text-primary"
                    )}
                  >
                    {children}
                  </a>
                ),
                // Checkbox para task lists
                input: ({ type, checked, ...props }) => {
                  if (type === 'checkbox') {
                    return (
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled
                        className="mr-2 accent-primary"
                        {...props}
                      />
                    )
                  }
                  return <input type={type} {...props} />
                },
              }}
            >
              {displayText}
            </ReactMarkdown>
          </div>
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
}, (prevProps, nextProps) => {
  // Comparação personalizada para otimizar re-renders
  return (
    prevProps.message.role === nextProps.message.role &&
    prevProps.message.message === nextProps.message.message &&
    prevProps.message.isStreaming === nextProps.message.isStreaming &&
    prevProps.message.timestamp === nextProps.message.timestamp
  )
})

export default Message 