import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { captureFormSchema, CaptureFormSchema } from './schema';

// Chave para cache do react-query
const CAPTURE_MUTATION_KEY = ['capture-lead'] as const;

interface PostLeadPayload {
  name: string;
  email: string;
  phone: string;
  source: string;
  timestamp: string;
}

async function postLead(data: CaptureFormSchema): Promise<void> {
  const payload: PostLeadPayload = {
    name: data.name,
    email: data.email,
    phone: data.phone, // Já vem formatado do schema Zod
    source: 'landing-page-oab-rondonia',
    timestamp: new Date().toISOString(),
  };

  const response = await fetch('https://hook.us1.make.com/eb4hloejwjb553xm6wj2g8379zatckqy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorMessage =
      response.status >= 500
        ? 'Erro interno do servidor. Tente novamente em alguns minutos.'
        : 'Falha ao enviar seus dados. Verifique os dados e tente novamente.';

    throw new Error(errorMessage);
  }

  // Verifica se a resposta tem conteúdo antes de tentar fazer parse
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    await response.json(); // Consome a resposta se for JSON
  }
}

export function useCaptureModel() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<CaptureFormSchema>({
    resolver: zodResolver(captureFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const { mutate, isPending, error } = useMutation<void, Error, CaptureFormSchema>({
    mutationKey: CAPTURE_MUTATION_KEY,
    mutationFn: postLead,
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success('Cadastro realizado com sucesso!');
      reset();

      // Invalida queries relacionadas se houver
      queryClient.invalidateQueries({ queryKey: CAPTURE_MUTATION_KEY });
    },
    onError: error => {
      // Preferência do usuário: usar toast no onError da mutation
      toast.error(error.message);
    },
    // Retry em caso de erro de rede
    retry: (failureCount, error) => {
      // Retry até 2 vezes apenas para erros de rede/servidor
      if (failureCount < 2 && error.message.includes('servidor')) {
        return true;
      }
      return false;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Função otimizada de submit - zodResolver já validou e transformou os dados
  const onSubmit = useCallback(
    (data: CaptureFormSchema) => {
      // Os dados já vêm validados e transformados pelo zodResolver
      // Error handling é feito automaticamente pelo onError da mutation
      mutate(data);
    },
    [mutate]
  );

  return {
    // Form hooks
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    trigger,

    // States
    isSubmitted,
    isSubmitting: isPending,
    isValid,
    isDirty,
    mutationError: error,

    // Actions
    onSubmit,

    // Utils
    setIsSubmitted,
  };
}
