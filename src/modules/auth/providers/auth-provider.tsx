import { ReactNode, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useLocation } from "wouter";
import { useLocalStorage } from "@uidotdev/usehooks";

import { AuthContext, AuthContextProps } from "../contexts/auth-context";

import { toast } from "sonner";

import { api } from "@/shared/lib/axios";

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [, setLocation] = useLocation()
  const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token']);
  const [user, setUser] = useLocalStorage<{
    name: string
    email: string
  } | null>('user', null)

  const token = cookies['x-auth-token'];

  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (email: string): ReturnType<AuthContextProps['login']> => {
      const response = await api.post('/webhook/api/v1/auth/login', { email });
      return response.data;
    },
    onSuccess: (data) => {
      setCookie('x-auth-token', data.token);
      toast.success('Login realizado com sucesso!');
      setLocation('/agents');
    },
    onError: () => {
      toast.error('Erro ao fazer login. Verifique seu e-mail.');
    },
  });

  async function logout(): ReturnType<AuthContextProps['logout']> {
    setLocation('/login')
    removeCookie('x-auth-token')
    setUser(null)

    toast.success("Logout feito com sucesso!")

    return {
      ok: true
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get<{ name: string; email: string }>('webhook/api/v1/users/me');
          setUser({
            name: response.data.name,
            email: response.data.email
          });
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUser();
  }, [token, setUser]);

  return <AuthContext value={{ login, isLoginPending, isAuthenticated: !!token, logout, token, user }}>{children}</AuthContext>
}