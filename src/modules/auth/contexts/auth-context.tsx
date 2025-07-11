import { createContext } from "react"

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
  login: (request: LoginRequest) => Promise<LoginResultResponse>;
  isLoginPending: boolean
  logout: () => Promise<ResultResponse>;
  token: string | null
  user: {
    email: string
    name: string
  } | null
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);