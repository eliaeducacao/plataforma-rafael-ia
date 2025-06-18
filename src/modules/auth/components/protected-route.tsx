import { ReactNode } from "react"
import { AppSidebar } from "@/shared/components/app-sidebar"
import { SidebarProvider } from "@/shared/components/ui/sidebar"

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}