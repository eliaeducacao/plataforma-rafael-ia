import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'O e-mail precisa ser válido.' }),
});

export type FormSchema = z.infer<typeof formSchema>;
