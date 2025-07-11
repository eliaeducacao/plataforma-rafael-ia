import { ReactNode, useEffect } from "react"
import { useAuth } from "../hooks/use-auth"

import { AppSidebar } from "@/shared/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar"

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, logout, user } = useAuth()

  useEffect(() => { }, [token])
  return (
    <SidebarProvider>
      <AppSidebar user={{
        avatar: '',
        email: user?.email ?? '',
        name: user?.name ?? ''
      }} onLogout={logout} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}