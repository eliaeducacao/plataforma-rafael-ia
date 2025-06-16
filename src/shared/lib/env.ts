import { z } from "zod/v4-mini";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.url({
    message: "URL do Supabase inválida"
  }),
  VITE_SUPABASE_KEY: z.string({
    message: "Chave anônima do Supabase é obrigatória"
  }),
  VITE_SMTP_HOST: z.string({
    message: "Host do SMTP é obrigatório"
  }),
  VITE_SMTP_PORT: z.coerce.number({
    message: "Porta do SMTP deve ser um número"
  }),
  VITE_SMTP_USER: z.string({
    message: "Usuário do SMTP é obrigatório"
  }),
  VITE_SMTP_PASSWORD: z.string({
    message: "Senha do SMTP é obrigatória"
  }),
  VITE_SMTP_NAME: z.string({
    message: "Nome do remetente é obrigatório"
  }),
  VITE_SMTP_EMAIL: z.email({
    message: "Email do remetente inválido"
  }),

  VITE_OPENAI_KEY: z.string({
    message: "Chave da API OpenAI é obrigatória"
  }),
});


export const env = envSchema.parse(import.meta.env);