import { SidebarTrigger } from "@/shared/components/ui/sidebar"

interface InternalHeaderProps {
  children?: React.ReactNode
  className?: string
}

export function InternalHeader({ children, className = "" }: InternalHeaderProps) {
  return (
    <>
      {/* Botão flutuante da sidebar */}
      <div className="fixed top-6 left-6 z-50 md:hidden">
        <SidebarTrigger className="shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border" />
      </div>
      
      {/* Conteúdo do header se necessário */}
      {children && (
        <header className={`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b ${className}`}>
          <div className="flex items-center gap-4 px-4 py-3">
            {children}
          </div>
        </header>
      )}
    </>
  )
} 