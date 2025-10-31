import { createContext } from "react"
import { FormSchema as CreateUserFormSchema } from "../pages/create-user/create-user.schema"

type ResultResponse = {
  ok: boolean
}

export type LoginRequest = {
  email: string
  password: string
}

type LoginResultResponse = {
  token: string
}

export type AuthContextProps = {
  isAuthenticated: boolean;
  resetPassword: ({ id, code, new_password }: { id: string, code: string, new_password: string }) => Promise<void>;
  sendEmailToResetPassword: ({ email }: { email: string }) => Promise<void>;
  createUser: (data: CreateUserFormSchema) => Promise<void>;
  login: (request: LoginRequest) => Promise<LoginResultResponse>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  isLoginPending: boolean
  isResetPasswordPending: boolean
  logout: () => Promise<ResultResponse>;
  token: string | null
  user: {
    email: string
    name: string
  } | null
  isCreateUserPending: boolean
  isResetEmailDisabled: boolean
  isSendEmailToResetPasswordPending: boolean
  isRegisterPending: boolean
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);