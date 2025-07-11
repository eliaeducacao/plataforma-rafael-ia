import { useCreateUserModel } from "./create-user.model";

import { Lock, User } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

export function CreateUserView(props: ReturnType<typeof useCreateUserModel>) {
  const { onSubmit, handleSubmit, errors, register } = props

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Criar usuário
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Crie um novo usuário
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-full max-w-md mx-auto p-4">
          <div className="bg-white h-lg rounded-lg shadow-md p-4 space-y-3">
            <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
              <div className="space-y-2 mb-1">
                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    id="name"
                    className="pl-9"
                    placeholder="Nome"
                    {...register('name')}
                  />
                </div>
              </div>

              {errors.name && (
                <div className="text-xs text-destructive mb-2">
                  {errors.name.message}
                </div>
              )}

              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nova senha
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

              {errors.password && (
                <div className="text-xs text-destructive mb-2">
                  {errors.password.message}
                </div>
              )}

              <div className="space-y-2 mb-1">
                <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Confirme a nova senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    id="confirmPassword"
                    className="pl-9"
                    placeholder="********"
                    {...register('confirmPassword')}
                  />
                </div>
              </div>

              {errors.confirmPassword && (
                <div className="text-xs text-destructive mb-2">
                  {errors.confirmPassword.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
              >
                Criar usuário
              </Button>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}