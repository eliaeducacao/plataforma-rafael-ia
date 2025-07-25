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
    speed: 1,
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

        {/* Indicador de arquivos anexados */}
        {message.attachedFiles && message.attachedFiles.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachedFiles.map((file, index) => (
              <div key={file.id || index} className="p-2 bg-background/50 rounded-md border border-border/50 flex items-center gap-2 max-w-full">
                {/* Preview de imagem */}
                {file.mimeType && file.mimeType.startsWith('image/') && file.mimeType !== 'image/gif' && file.contentBase64 ? (
                  <img
                    src={`data:${file.mimeType};base64,${file.contentBase64}`}
                    alt={file.filename}
                    className="h-10 w-10 object-cover rounded border border-border mr-2"
                    style={{ maxWidth: 48, maxHeight: 48 }}
                  />
                ) : (
                  <div className="flex-shrink-0">
                    {file.mimeType === 'application/pdf' ? (
                      <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0012 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-foreground">
                    {file.filename}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {file.size > 0
                      ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                      : file.mimeType === 'application/pdf' ? 'PDF' : 'DOCX'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

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
  const prevFiles = prevProps.message.attachedFiles || [];
  const nextFiles = nextProps.message.attachedFiles || [];

  return (
    prevProps.message.role === nextProps.message.role &&
    prevProps.message.message === nextProps.message.message &&
    prevProps.message.isStreaming === nextProps.message.isStreaming &&
    prevProps.message.timestamp === nextProps.message.timestamp &&
    prevFiles.length === nextFiles.length &&
    prevFiles.every((file, index) => file.filename === nextFiles[index]?.filename)
  )
})

export default Message 