import { ReactNode, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useLocation } from "wouter";
import { useLocalStorage } from "@uidotdev/usehooks";

import { AuthContext, AuthContextProps, LoginRequest } from "../contexts/auth-context";

import { toast } from "sonner";

import { api } from "@/shared/lib/axios";
import { FormSchema as CreateUserFormSchema } from "../pages/create-user/create-user.schema";
import { AxiosError } from "axios";
import { StripeSubscriptionStatus } from '@/shared/types';

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [, setLocation] = useLocation()
  const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token']);
  const [resetEmailDisabledUntil, setResetEmailDisabledUntil] = useState<number | null>(null);
  const [isResetEmailDisabled, setIsResetEmailDisabled] = useState(false);
  const [user, setUser] = useLocalStorage<{
    _id: string
    name: string
    email: string
    code: string
    status: StripeSubscriptionStatus | null
    plan: string | null
    subscription: string | null
  } | null>('user', null)

  const token = cookies['x-auth-token'];

  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ email, password }: LoginRequest) => {
      const response = await api.post('/webhook/api/v2/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Sucesso! ")
      setCookie('x-auth-token', data.token);
      toast.success('Login realizado com sucesso!');
      setLocation('/agents');
    },
    onError: (error: AxiosError) => {
      console.log("Erro! ", error);

      // Verificar se o erro é específico sobre e-mail não encontrado
      const errorData = error.response?.data as { error?: string };
      if (errorData?.error === 'NOT_EMAIL_FOUND') {
        toast.error('Este e-mail não é um e-mail de aluno na plataforma.');
      } else if (error.response?.status === 401) {
        toast.error('E-mail ou senha inválidos.');
      } else {
        toast.error('Erro ao fazer login. Verifique seu e-mail.');
      }
    },
  });

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async ({ id, code, new_password }: { id: string, code: string, new_password: string }): ReturnType<AuthContextProps['resetPassword']> => {
      const response = await api.post('/webhook/api/v1/auth/reset-password', { id, code, new_password });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Senha resetada com sucesso!');
      setLocation('/login');
    },
    onError: (error: AxiosError) => {
      console.log("Erro ao resetar senha:", error);

      // Verificar se o erro é específico sobre e-mail não encontrado
      const errorData = error.response?.data as { error?: string };
      if (errorData?.error === 'NOT_EMAIL_FOUND') {
        toast.error('Este e-mail não é um e-mail de aluno na plataforma.');
      } else {
        toast.error('Erro ao resetar senha. Verifique o código e a nova senha.');
      }
    },
  });

  const { mutateAsync: sendEmailToResetPassword, isPending: isSendEmailToResetPasswordPending } = useMutation({
    mutationKey: ['send-email-to-reset-password'],
    mutationFn: async ({ email }: { email: string }): ReturnType<AuthContextProps['sendEmailToResetPassword']> => {
      const response = await api.post('/webhook/api/v2/webhook/reset-password/send', { email });
      return response.data;
    },
    onSuccess: () => {
      toast.success('E-mail de recuperação de senha enviado com sucesso!');
      setLocation('/confirm-email');

      // 🚀 bloquear botão por 10 minutos (600.000 ms)
      const expireAt = Date.now() + 10 * 60 * 1000;
      setResetEmailDisabledUntil(expireAt);
    },
    onError: (error: AxiosError) => {
      console.log("Erro ao enviar e-mail de recuperação:", error);

      const errorData = error.response?.data as { error?: string };
      if (errorData?.error === 'NOT_EMAIL_FOUND') {
        toast.error('Este e-mail não é um e-mail de aluno na plataforma.');
      } else {
        toast.error('Erro ao enviar e-mail de recuperação de senha. Verifique o e-mail informado.');
      }
    },
  });

  useEffect(() => {
    if (!resetEmailDisabledUntil) return;

    const interval = setInterval(() => {
      if (Date.now() >= resetEmailDisabledUntil) {
        setIsResetEmailDisabled(false);
        setResetEmailDisabledUntil(null);
        clearInterval(interval);
      } else {
        setIsResetEmailDisabled(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resetEmailDisabledUntil]);

  const { mutateAsync: createUser, isPending: isCreateUserPending } = useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (data: CreateUserFormSchema) => {
      const response = await api.post('/webhook/api/v1/auth/create-user', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Usuário criado com sucesso!');
      setLocation('/login');
    },
    onError: (error: AxiosError) => {
      console.log("Erro ao criar usuário:", error);

      // Verificar se o erro é específico sobre e-mail não encontrado
      const errorData = error.response?.data as { error?: string };
      if (errorData?.error === 'NOT_EMAIL_FOUND') {
        toast.error('Este e-mail não é um e-mail de aluno na plataforma.');
      } else {
        toast.error('Erro ao criar usuário. Verifique os dados informados.');
      }
    },
  });

  const { mutateAsync: register, isPending: isRegisterPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const response = await api.post('/webhook/api/v2/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: async (_, variables) => {
      toast.success('Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.');
      await login({ email: variables.email, password: variables.password });
    },
    onError: (error: AxiosError) => {
      console.log("Erro ao registrar usuário:", error);

      const errorData = error.response?.data as { error?: string; message?: string };

      if (error.response?.status === 400) {
        // E-mail já existe
        if (errorData?.error === 'EMAIL_ALREADY_EXISTS' || errorData?.message?.toLowerCase().includes('email')) {
          toast.error('Este e-mail já está cadastrado. Tente fazer login ou recuperar sua senha.');
        } else if (errorData?.message) {
          toast.error(errorData.message);
        } else {
          toast.error('Erro ao criar conta. Verifique os dados informados.');
        }
      } else if (error.response?.status === 500) {
        toast.error('Erro interno do servidor. Tente novamente mais tarde.');
      } else {
        toast.error('Erro ao criar conta. Tente novamente.');
      }
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
          const response = await api.get<{
            _id: string
            name: string
            email: string
            code: string
            status: StripeSubscriptionStatus | null
            plan: string | null
            subscription: string | null
          }>('webhook/api/v1/users/me');
          setUser({
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            code: response.data.code,
            status: response.data.status,
            plan: response.data.plan ?? null,
            subscription: response.data.subscription ?? null,
          });
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUser();
  }, [token, setUser]);

  return <AuthContext value={{
    login, isLoginPending, isAuthenticated: !!token, logout, token, user, resetPassword, isResetPasswordPending, createUser, isCreateUserPending, sendEmailToResetPassword, isSendEmailToResetPasswordPending,
    isResetEmailDisabled, register, isRegisterPending
  }}>{children}</AuthContext>
}