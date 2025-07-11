import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'O e-mail precisa ser válido.' }),
  password: z
    .string()
    .min(1, { message: 'A senha é obrigatória' })
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

export type FormSchema = z.infer<typeof formSchema>;
