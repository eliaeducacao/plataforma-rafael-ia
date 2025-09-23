import { useEmailToResetPassModel } from "./email-to-reset-pass.model";

import { Mail } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "../../hooks/use-auth";

export function EmailToResetPassView(props: ReturnType<typeof useEmailToResetPassModel>) {
  const { onSubmit, handleSubmit, errors, register } = props
  const { sendEmailToResetPassword, isSendEmailToResetPasswordPending, isResetEmailDisabled } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Recupere sua senha
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digite seu e-mail para recuperar sua senha
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-full max-w-md mx-auto p-4">
          <div className="bg-white h-lg rounded-lg shadow-md p-4 space-y-3">
            <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
              <div className="space-y-2 mb-1">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    id="email"
                    className="pl-9"
                    placeholder="exemplo@email.com"
                    {...register('email')}
                  />
                </div>
              </div>

              {errors.email && (
                <div className="text-xs text-destructive mb-2">
                  {errors.email.message}
                </div>
              )}

              <Button
                onClick={() => sendEmailToResetPassword({ email : '' })}
                disabled={isSendEmailToResetPasswordPending || isResetEmailDisabled}
              >
                {isResetEmailDisabled ? "Aguarde 10 min..." : "Recuperar senha"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}