import { useState, useEffect, useRef } from 'react'
import { Command } from 'cmdk'
import { ChevronRight, Sparkles } from 'lucide-react'
import type { Agent } from '@/shared/types'

interface CommandMenuProps {
  isVisible: boolean
  onSelectCommand: (command: string) => void
  currentAgent?: Agent | null
  position: { top: number; left: number }
}

interface CommandItem {
  id: string
  label: string
  description: string
  command: string
  icon: React.ReactNode
  keywords?: string[]
}

export function CommandMenu({
  isVisible,
  onSelectCommand,
  currentAgent,
  position
}: CommandMenuProps) {
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Resetar estado quando visibilidade muda
  useEffect(() => {
    if (isVisible) {
      setSearch('')
    }
  }, [isVisible])

  // Comandos disponíveis
  const commands: CommandItem[] = [
    {
      id: 'prompt',
      label: 'Prompt do Agente',
      description: currentAgent?.prompt || 'Insere o prompt do agente atual',
      command: '/prompt',
      icon: <Sparkles className="h-4 w-4" />,
      keywords: ['prompt', 'agente', 'contexto', 'instrução']
    }
  ]

  const handleSelect = (value: string) => {
    const command = commands.find(cmd => cmd.id === value)
    if (command) {
      onSelectCommand(command.command)
    }
  }

  // Selecionar automaticamente o primeiro comando se disponível
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && commands.length > 0) {
      e.preventDefault()
      const firstCommand = commands[0]
      if (firstCommand) {
        handleSelect(firstCommand.id)
      }
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="absolute z-50 inset-x-0"
      style={{
        top: position.top,
        left: position.left
      }}
      onKeyDown={handleKeyDown}
    >
      <Command className="w-full rounded-lg border bg-popover shadow-lg">
        <div className="flex items-center border-b px-3">
          <Sparkles className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Command.Input
            placeholder="Buscar comandos..."
            value={search}
            onValueChange={setSearch}
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Command.List className="max-h-48 overflow-y-auto p-1">
          <Command.Empty className="py-6 text-center text-sm">
            Nenhum comando encontrado.
          </Command.Empty>
          {commands.map((command) => (
            <Command.Item
              key={command.id}
              value={command.id}
              onSelect={handleSelect}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="flex h-4 w-4 items-center justify-center">
                  {command.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{command.label}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {command.description}
                  </div>
                </div>
              </div>
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  )
} 