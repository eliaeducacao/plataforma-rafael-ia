import { z } from 'zod/v4-mini';

export const envSchema = z.object({
  VITE_API_BASE_URL: z.url({
    message: 'URL da API é obrigatória',
  }),
});

export const env = import.meta.env;
