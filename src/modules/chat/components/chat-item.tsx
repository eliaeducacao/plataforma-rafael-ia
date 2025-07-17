import { useState, useRef, useEffect } from 'react'
import { Trash2, Check, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog'
import { cn } from '@/shared/lib/utils'
import type { Chat } from '../types'

interface ChatItemProps {
  chat: Chat
  isSelected: boolean
  onSelect: (chatId: string) => void
  onDelete: (chatId: string) => void
  onUpdateTitle: (chatId: string, title: string) => Promise<unknown> | void
  isEditing: boolean
  onStartEdit: () => void
  onStopEdit: () => void
  isUpdatingTitle: boolean
  isUpdateSuccess: boolean
  resetMutation: () => void
}

export function ChatItem({
  chat,
  isSelected,
  onSelect,
  onDelete,
  onUpdateTitle,
  isEditing,
  onStartEdit,
  onStopEdit,
  isUpdatingTitle,
  isUpdateSuccess,
  resetMutation
}: ChatItemProps) {
  const [editTitle, setEditTitle] = useState(chat.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing && isUpdateSuccess) {
      onStopEdit()
      resetMutation()
    }
  }, [isEditing, isUpdateSuccess, onStopEdit, resetMutation])

  const handleDoubleClick = () => {
    setEditTitle(chat.title)
    onStartEdit()
  }

  const handleSave = async () => {
    if (editTitle.trim() && editTitle !== chat.title) {
      await onUpdateTitle(chat._id, editTitle.trim())
    } else {
      onStopEdit()
      resetMutation()
    }
  }

  const handleCancel = () => {
    setEditTitle(chat.title)
    onStopEdit()
    resetMutation()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  // Handler simples para deletar
  const handleDelete = (chatId: string) => {
    onDelete(chatId)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-3 border rounded-md bg-background">
        <Input
          ref={inputRef}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 text-sm"
          maxLength={100}
          disabled={isUpdatingTitle}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={handleSave}
          className="h-8 w-8"
          disabled={isUpdatingTitle}
        >
          {isUpdatingTitle ? <span className="loader h-4 w-4" /> : <Check className="h-4 w-4" />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCancel}
          className="h-8 w-8"
          disabled={isUpdatingTitle}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="relative group">
      <Button
        variant={isSelected ? "secondary" : "ghost"}
        onClick={() => onSelect(chat._id)}
        onDoubleClick={handleDoubleClick}
        className={cn(
          "w-full justify-start h-auto p-3 text-left",
          isSelected && "bg-secondary"
        )}
      >
        <div className="flex flex-col items-start space-y-1 w-full min-w-0">
          <div className="font-medium truncate w-full text-sm sm:text-base">
            {chat.title}
          </div>
        </div>
      </Button>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
        {/* Mobile: ícone preto, sempre visível. Tablet/Desktop: botão destrutivo só no hover */}
        <div className="block md:hidden">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button type="button">
                <Trash2 className="h-5 w-5 text-black" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deletar conversa</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja deletar a conversa "{chat.title}"? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(chat._id)}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deletar conversa</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja deletar a conversa "{chat.title}"? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(chat._id)}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
} 