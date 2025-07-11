import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().min(1, { message: 'A senha é obrigatória' }),
});

export type FormSchema = z.infer<typeof formSchema>;
