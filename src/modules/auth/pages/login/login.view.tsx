import { useLoginModel } from "./login.model";

import { Mail, Lock } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Link } from "wouter";

export function LoginView(props: ReturnType<typeof useLoginModel>) {
  const { onSubmit, handleSubmit, errors, register, loading } = props

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Elia IA
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Faça login para acessar o sistema
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-full max-w-md mx-auto p-4">
          <div className="bg-white h-lg rounded-lg shadow-md px-4 py-5 space-y-3">
            <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
              <div className="flex flex-col pb-4">
                <div className="space-y-2 mb-1">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      id="email"
                      className="pl-9"
                      placeholder="seuemail@email.com"
                      {...register('email')}
                    />
                  </div>
                </div>

                {errors.email && (
                  <div className="text-xs text-destructive mb-2">
                    {errors.email.message}
                  </div>
                )}

                <div className="space-y-2 mb-1">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      id="password"
                      className="pl-9"
                      placeholder="********"
                      {...register('password')}
                    />
                  </div>
                </div>

                {errors.password && (
                  <div className="text-xs text-destructive mb-2">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                Entrar
              </Button>

              <div className="mt-4 text-center">
                <Link href="/email-to-reset-pass" className="text-sm text-purple-600 hover:text-purple-500">
                  Esqueceu sua senha?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}