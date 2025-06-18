import { ReactNode } from "react"

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <div>{children}</div>
}