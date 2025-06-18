import { createContext, ReactNode, use, useEffect, useState } from 'react';

import { toast } from 'sonner';

import { useLocation } from 'wouter';
import { useLocalStorage } from '@uidotdev/usehooks'

import { AUTHORIZED_EMAILS } from '../constants/authorized-emails.constants';

type ResultResponse = {
  ok: boolean
}

type AuthContextProps = {
  isAuthenticated: boolean;
  login: (email: string) => Promise<ResultResponse>;
  logout: () => Promise<ResultResponse>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [, setLocation] = useLocation()
  const [email, setEmail] = useLocalStorage<string | null>("email-auth", null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function login(email: string): ReturnType<AuthContextProps['login']> {
    // Verifica se está na lista dos emails autorizados
    if (AUTHORIZED_EMAILS.includes(email)) {
      setEmail(email)
      setIsAuthenticated(true)

      toast.success("Sucesso!")
      setLocation('/agents')

      return {
        ok: true
      }
    } else {
      return {
        ok: false
      }
    }
  }

  async function logout(): ReturnType<AuthContextProps['logout']> {
    setEmail(null)
    setIsAuthenticated(false)
    setLocation('/login')

    toast.success("Logout feito com sucesso!")

    return {
      ok: true
    }
  }

  // Verifica se o usuário está logado
  useEffect(() => {
    if (email && AUTHORIZED_EMAILS.includes(email)) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [email])

  return <AuthContext value={{ login, isAuthenticated, logout }}>{children}</AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)

  if (!context ) {
    throw new Error('useAuth must be used within a theme provider.')
  }

  return context
}