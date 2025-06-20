import { ReactNode } from "react";

import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useLocation } from "wouter";

import { AuthContext, AuthContextProps } from "../contexts/auth-context";

import { toast } from "sonner";

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [, setLocation] = useLocation()
  const [token, setToken] = useCookies<'x-auth-token', string | null>(['x-auth-token']);

  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (email: string): ReturnType<AuthContextProps['login']> => {
      const response = await fetch('https://api.eliaeducacao.com.br/webhook/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json();
      return data;
    },
    onSuccess: ({ token }) => {
      setToken('x-auth-token', token);

      toast.success('Login realizado com sucesso!');
      setLocation('/agents');
    },
    onError: () => {
      toast.error('Erro ao fazer login. Verifique seu e-mail.');
    },
  });

  async function logout(): ReturnType<AuthContextProps['logout']> {
    setLocation('/login')
    setToken('x-auth-token', null)

    toast.success("Logout feito com sucesso!")

    return {
      ok: true
    }
  }

  return <AuthContext value={{ login, isLoginPending, isAuthenticated: !!token, logout, token }}>{children}</AuthContext>
}