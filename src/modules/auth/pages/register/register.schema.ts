import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'O nome é obrigatório' })
      .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres' })
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: 'O nome deve conter apenas letras e espaços' }),
    email: z
      .string()
      .min(1, { message: 'O e-mail é obrigatório' })
      .email({ message: 'O e-mail precisa ser válido' }),
    password: z
      .string()
      .min(1, { message: 'A senha é obrigatória' })
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .regex(/[A-Z]/, { message: 'A senha deve conter ao menos 1 letra maiúscula' })
      .regex(/[a-z]/, { message: 'A senha deve conter ao menos 1 letra minúscula' })
      .regex(/[0-9]/, { message: 'A senha deve conter ao menos 1 número' })
      .regex(/[^a-zA-Z0-9]/, { message: 'A senha deve conter ao menos 1 caractere especial' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'A confirmação de senha é obrigatória' }),
    acceptTerms: z
      .boolean()
      .refine(val => val === true, { message: 'Você deve aceitar os termos e condições' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof formSchema>;

