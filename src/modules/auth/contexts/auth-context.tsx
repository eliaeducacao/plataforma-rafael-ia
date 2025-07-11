import { createContext } from "react"
import { FormSchema as CreateUserFormSchema } from "../pages/create-user/create-user.schema"

type ResultResponse = {
  ok: boolean
}

type LoginResultResponse = {
  token: string
}

export type AuthContextProps = {
  isAuthenticated: boolean;
  login: (email: string) => Promise<LoginResultResponse>;
  resetPassword: ({ id, code, new_password }: { id: string, code: string, new_password: string }) => Promise<void>;
  createUser: (data: CreateUserFormSchema) => Promise<void>;
  isLoginPending: boolean
  isResetPasswordPending: boolean
  logout: () => Promise<ResultResponse>;
  token: string | null
  user: {
    email: string
    name: string
  } | null
  isCreateUserPending: boolean
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);