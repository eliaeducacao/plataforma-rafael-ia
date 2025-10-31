import { useRegisterModel } from "./register.model";

import { Mail, Lock, User } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Link } from "wouter";
import { Controller } from "react-hook-form";

export function RegisterView(props: ReturnType<typeof useRegisterModel>) {
  const { onSubmit, handleSubmit, errors, register, control, loading } = props;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Elia IA
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Crie sua conta para acessar o sistema
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-full max-w-md mx-auto p-4">
          <div className="bg-white h-lg rounded-lg shadow-md px-4 py-5 space-y-3">
            <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
              <div className="flex flex-col pb-4 space-y-4">
                {/* Campo Nome */}
                <div className="space-y-2">
                  <label 
                    htmlFor="name" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      id="name"
                      className="pl-9"
                      placeholder="Seu nome completo"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      {...register('name')}
                    />
                  </div>
                  {errors.name && (
                    <div 
                      id="name-error"
                      className="text-xs text-destructive mb-2"
                      role="alert"
                    >
                      {errors.name.message}
                    </div>
                  )}
                </div>

                {/* Campo Email */}
                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      id="email"
                      className="pl-9"
                      placeholder="seuemail@email.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <div 
                      id="email-error"
                      className="text-xs text-destructive mb-2"
                      role="alert"
                    >
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Campo Senha */}
                <div className="space-y-2">
                  <label 
                    htmlFor="password" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      id="password"
                      className="pl-9"
                      placeholder="********"
                      aria-invalid={errors.password ? 'true' : 'false'}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      {...register('password')}
                    />
                  </div>
                  {errors.password && (
                    <div 
                      id="password-error"
                      className="text-xs text-destructive mb-2"
                      role="alert"
                    >
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Campo Confirmar Senha */}
                <div className="space-y-2">
                  <label 
                    htmlFor="confirmPassword" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      id="confirmPassword"
                      className="pl-9"
                      placeholder="********"
                      aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                      {...register('confirmPassword')}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div 
                      id="confirmPassword-error"
                      className="text-xs text-destructive mb-2"
                      role="alert"
                    >
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                {/* Checkbox Termos e Condições */}
                <div className="space-y-2">
                  <Controller
                    name="acceptTerms"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={errors.acceptTerms ? 'true' : 'false'}
                          aria-describedby={errors.acceptTerms ? 'acceptTerms-error' : undefined}
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor="acceptTerms"
                            className="text-sm text-gray-700 cursor-pointer leading-tight"
                          >
                            Aceito os{' '}
                            <Link 
                              href="/termos" 
                              className="text-purple-600 hover:text-purple-500 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Termos e Condições
                            </Link>
                            {' '}de uso
                          </Label>
                        </div>
                      </div>
                    )}
                  />
                  {errors.acceptTerms && (
                    <div 
                      id="acceptTerms-error"
                      className="text-xs text-destructive mb-2 ml-6"
                      role="alert"
                    >
                      {errors.acceptTerms.message}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </Button>

              <div className="mt-4 text-center">
                <Link 
                  href="/login" 
                  className="text-sm text-purple-600 hover:text-purple-500"
                >
                  Já possui uma conta? Faça login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

