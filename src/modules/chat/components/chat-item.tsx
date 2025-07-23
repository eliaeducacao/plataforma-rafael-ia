import { useState, useRef, useEffect } from 'react'
import { Trash2, Check, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
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
      <SidebarMenuItem>
        <div className="flex items-center gap-2 p-2 border rounded-md bg-background">
          <Input
            ref={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 text-sm h-8"
            maxLength={100}
            disabled={isUpdatingTitle}
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSave}
            className="h-6 w-6"
            disabled={isUpdatingTitle}
          >
            {isUpdatingTitle ? <span className="loader h-3 w-3" /> : <Check className="h-3 w-3" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCancel}
            className="h-6 w-6"
            disabled={isUpdatingTitle}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <div className="relative group">
        <SidebarMenuButton
          onClick={() => onSelect(chat._id)}
          onDoubleClick={handleDoubleClick}
          className={cn(
            "w-full justify-start",
            isSelected && "!bg-primary/10 !text-primary"
          )}
        >
          <span className="truncate">{chat.title}</span>
        </SidebarMenuButton>
        
        {/* Botão deletar - só aparece no hover do item específico */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {/* Mobile: ícone sempre visível */}
          <div className="block md:hidden">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button type="button" className="p-1">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
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
          
          {/* Desktop: aparece só no hover */}
          <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-3 w-3" />
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
    </SidebarMenuItem>
  )
} 