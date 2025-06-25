import { ReactNode, useEffect } from "react"
import { useAuth } from "../hooks/use-auth"

import { AppSidebar } from "@/shared/components/app-sidebar"
import { SidebarProvider } from "@/shared/components/ui/sidebar"

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, logout, user } = useAuth()

  useEffect(() => { }, [token])
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar user={{
          avatar: '',
          email: user?.email ?? '',
          name: user?.name ?? ''
        }} onLogout={logout} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}