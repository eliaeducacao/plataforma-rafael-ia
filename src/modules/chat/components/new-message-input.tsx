import { Send, Paperclip, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Textarea } from "@/shared/components/ui/textarea"
import { AudioRecorderButton } from "./audio-recorder-button"
import FileUploadModal from "./file-upload-modal"
import { CommandMenu } from "./command-menu"
import type { FileWithId } from "./multi-file-upload"
import type { SubmitData } from "../pages/chat.model"
import type { Agent } from "@/shared/types"
import { useState, useRef, useCallback } from "react"

interface NewMessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (data: SubmitData) => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onInputResize: (e: React.FormEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  selectedFiles?: FileWithId[]
  isConverting?: boolean
  onFilesSelect: (files: FileWithId[]) => void
  onFileRemove: (fileId: string) => void
  onAudioRecorded?: (audioBlob: Blob) => void
  currentAgent?: Agent | null
}

export default function NewMessageInput({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  onInputResize,
  disabled = false,
  selectedFiles = [],
  isConverting = false,
  onFilesSelect,
  onFileRemove,
  onAudioRecorded,
  currentAgent
}: NewMessageInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showCommands, setShowCommands] = useState(false)
  const [commandPosition, setCommandPosition] = useState({ top: 0, left: 0 })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ message: value })
  }

  const handleAudioRecorded = (audioBlob: Blob) => {
    if (onAudioRecorded) {
      onAudioRecorded(audioBlob)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    onChange(newValue)

    // Verificar se o usuário digitou "/" para mostrar comandos
    if (newValue.endsWith('/') && !showCommands) {
      setShowCommands(true)
      updateCommandPosition()
    } else if (!newValue.includes('/') && showCommands) {
      setShowCommands(false)
    } else if (showCommands && newValue.includes('/')) {
      updateCommandPosition()
    }
  }

  const updateCommandPosition = useCallback(() => {
    if (textareaRef.current) {
      const rect = textareaRef.current.getBoundingClientRect()
      const textBeforeSlash = value.substring(0, value.lastIndexOf('/'))

      // Calcular posição aproximada do cursor
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (context) {
        context.font = window.getComputedStyle(textareaRef.current).font
        const textWidth = context.measureText(textBeforeSlash).width

        // Calcular posição relativa ao textarea
        const relativeLeft = Math.min(textWidth, rect.width - 100)

        setCommandPosition({
          top: -10, // Posição acima do input
          left: relativeLeft
        })
      }
    }
  }, [value])

  const handleSelectCommand = (command: string) => {
    if (command === '/prompt' && currentAgent?.prompt) {
      // Substituir o "/" pelo prompt do agente
      const newValue = value.replace(/\/$/, currentAgent.prompt)
      onChange(newValue)
    } else if (command) {
      // Para outros comandos futuros
      const newValue = value.replace(/\/$/, command)
      onChange(newValue)
    }

    setShowCommands(false)

    // Focar no textarea após selecionar comando
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }

  const handleKeyPressWithCommands = (e: React.KeyboardEvent) => {
    // Se os comandos estão visíveis, não processar teclas especiais
    if (showCommands && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape')) {
      return
    }

    onKeyPress(e)
  }

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto w-full">
          {/* Exibe arquivos selecionados em uma lista compacta */}
          {selectedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 px-2 py-1 bg-muted rounded-md text-xs"
                >
                  <span className="truncate max-w-32">{file.name}</span>
                  <button
                    onClick={() => onFileRemove(file.id)}
                    className="text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 w-full">
            <div className="flex-1 min-w-0 relative">
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={handleInputChange}
                onKeyPress={handleKeyPressWithCommands}
                onInput={onInputResize}
                placeholder="Digite aqui... (use / para comandos)"
                className="min-h-[40px] sm:min-h-[44px] max-h-32 resize-none w-full text-sm sm:text-sm md:text-base placeholder:text-sm overflow-y-auto"
                rows={1}
                disabled={disabled || isConverting}
                style={{
                  height: 'auto',
                  minHeight: '40px',
                  maxHeight: '128px'
                }}
              />
            </div>

            <div className="flex gap-2">
              {/* Botão de gravação de áudio */}
              {onAudioRecorded && (
                <AudioRecorderButton
                  onAudioRecorded={handleAudioRecorded}
                  disabled={disabled || isConverting}
                />
              )}

              {/* Botão de anexo */}
              <Button
                type="button"
                onClick={handleOpenModal}
                disabled={disabled || isConverting}
                size="icon"
                className="h-10 w-10 sm:h-11 sm:w-11 shrink-0"
                title="Anexar arquivos"
              >
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Anexo</span>
              </Button>

              {/* Botão de enviar */}
              <Button
                type="submit"
                disabled={(!value.trim() && selectedFiles.length === 0) || disabled || isConverting}
                size="icon"
                className="h-10 w-10 sm:h-11 sm:w-11 shrink-0"
              >
                {isConverting ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {isConverting ? 'Processando...' : 'Enviar mensagem'}
                </span>
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            {isConverting
              ? 'Processando arquivos...'
              : 'Pressione Enter para enviar, Shift+Enter para nova linha, / para comandos'
            }
          </p>
        </div>
      </div>

      {/* Menu de comandos */}
      <CommandMenu
        isVisible={showCommands}
        onSelectCommand={handleSelectCommand}
        currentAgent={currentAgent}
        position={commandPosition}
      />

      {/* Modal de upload de arquivos */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedFiles={selectedFiles}
        onFilesSelect={onFilesSelect}
        onFileRemove={onFileRemove}
        disabled={disabled || isConverting}
      />
    </div>
  )
} 