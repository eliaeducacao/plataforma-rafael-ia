import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(1, { message: 'O nome é obrigatório' }),
    password: z.string().min(1, { message: 'A senha é obrigatória' }),
    confirmPassword: z.string().min(1, { message: 'A confirmação de senha é obrigatória' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof formSchema>;
