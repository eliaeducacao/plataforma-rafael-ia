import { z } from 'zod';

// Função para limpar e validar telefone
const cleanPhone = (phone: string) => phone.replace(/\D/g, '');

export const captureFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .transform(name => name.trim()),

  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório')
    .max(100, 'Email deve ter no máximo 100 caracteres')
    .transform(email => email.toLowerCase().trim()),

  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .transform(phone => {
      // Limpa e formata o telefone para envio
      const digits = cleanPhone(phone);
      return digits.startsWith('55') ? digits : `55${digits}`;
    }),
});

export type CaptureFormSchema = z.infer<typeof captureFormSchema>;
