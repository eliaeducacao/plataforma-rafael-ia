import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

import { Mail } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { useAuth } from '@/modules/auth/contexts/auth-context';

const formSchema = z.object({
  email: z.string().min(1, { message: "O e-mail é obrigatório" }).email({ message: "O e-mail precisa ser válido."})
})

type FormSchema = z.infer<typeof formSchema>

export function LoginForm() {
  const { login } = useAuth()

  const { handleSubmit, register, formState: { errors }, setError } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit"
  })

  const onSubmit = async (data: FormSchema) => {
    const result = await login(data.email)
    if (result.ok) return

    setError('email', { message: "Esse não é um e-mail de estudante."})
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white h-lg rounded-lg shadow-md p-4 space-y-3">
        <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e) )}>
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

          <Button
            type="submit"
            className="w-full"
          >
            Entre no sistema
          </Button>
        </form>
      </div>
    </div>
  );
}