import { Send } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Textarea } from "@/shared/components/ui/textarea"
import { AudioRecorderButton } from "./audio-recorder-button"
import type { SubmitData } from "../pages/chat.model"

interface NewMessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (data: SubmitData) => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onInputResize: (e: React.FormEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  selectedFile?: File | null
  isConverting?: boolean
  onFileSelect: (file: File | null) => void
  onFileRemove: () => void
  onAudioRecorded?: (audioBlob: Blob) => void
}

export default function NewMessageInput({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  onInputResize,
  disabled = false,
  selectedFile,
  isConverting = false,
  onFileSelect,
  onFileRemove,
  onAudioRecorded
}: NewMessageInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ message: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFileSelect(file)
  }

  const handleFileUploadClick = () => {
    document.getElementById('file-upload')?.click()
  }

  const handleAudioRecorded = (audioBlob: Blob) => {
    if (onAudioRecorded) {
      onAudioRecorded(audioBlob)
    }
  }

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto w-full">
          {/* Exibe o arquivo selecionado */}
          {selectedFile && (
            <div className="mb-3 p-3 bg-muted rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Preview de imagem */}
                {selectedFile.type.startsWith('image/') && selectedFile.type !== 'image/gif' ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt={selectedFile.name}
                    className="h-10 w-10 object-cover rounded border border-border"
                    style={{ maxWidth: 48, maxHeight: 48 }}
                  />
                ) : selectedFile.type === 'application/pdf' ? (
                  <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0012 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0012 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm text-foreground">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={onFileRemove}
                className="text-muted-foreground hover:text-foreground"
                type="button"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 w-full">
            <div className="flex-1 min-w-0">
              <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={onKeyPress}
                onInput={onInputResize}
                placeholder="Digite aqui..."
                className="min-h-[40px] sm:min-h-[44px] resize-none w-full text-sm sm:text-sm md:text-base placeholder:text-sm"
                rows={1}
                disabled={disabled || isConverting}
              />
            </div>

            {/* Input de documento */}
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={disabled || isConverting}
            />

            {/* Input de imagem */}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={disabled || isConverting}
            />

            <div className="flex gap-2">
              {/* Botão de gravação de áudio */}
              {onAudioRecorded && (
                <AudioRecorderButton
                  onAudioRecorded={handleAudioRecorded}
                  disabled={disabled || isConverting}
                />
              )}

              {/* Botão de upload de PDF/DOCX */}
              <div className="relative">
                <Button
                  type="button"
                  onClick={handleFileUploadClick}
                  disabled={disabled || isConverting}
                  size="icon"
                  className="h-10 w-10 sm:h-11 sm:w-11 shrink-0"
                  title={selectedFile ? `Arquivo anexado: ${selectedFile.name}` : "Anexar PDF ou DOCX"}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="sr-only">Anexar arquivo</span>
                </Button>
                {/* Badge indicador de arquivo anexado - só aparece se for documento */}
                {selectedFile && !selectedFile.type.startsWith('image/') && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-200 shadow-sm border-2 border-background">
                    <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Botão de upload de imagem */}
              <div className="relative">
                <Button
                  type="button"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={disabled || isConverting}
                  size="icon"
                  className="h-10 w-10 sm:h-11 sm:w-11 shrink-0"
                  title={selectedFile ? `Imagem anexada: ${selectedFile.name}` : "Anexar Imagem"}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" stroke="currentColor" fill="none" />
                    <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" stroke="currentColor" fill="none" />
                    <path d="M21 15l-5-5L5 21" strokeWidth="2" stroke="currentColor" fill="none" />
                  </svg>
                  <span className="sr-only">Anexar imagem</span>
                </Button>
                {/* Badge indicador de imagem anexada - só aparece se for imagem */}
                {selectedFile && selectedFile.type.startsWith('image/') && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-200 shadow-sm border-2 border-background">
                    <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Botão de enviar */}
              <Button
                type="submit"
                disabled={(!value.trim() && !selectedFile) || disabled || isConverting}
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
              ? 'Processando arquivo...'
              : 'Pressione Enter para enviar, Shift+Enter para nova linha'
            }
          </p>
        </div>
      </div>
    </div>
  )
} 