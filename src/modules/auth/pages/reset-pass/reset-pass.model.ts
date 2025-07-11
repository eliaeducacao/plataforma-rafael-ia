import { useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './reset-pass.schema';
import { toast } from 'sonner';

export function useResetPassModel() {
  const [isAuthenticated] = useState(false);
  const [, navigate] = useLocation();
  const search = useSearch();

  const params = new URLSearchParams(search);
  const id = params.get('id');
  const code = params.get('code');

  const { resetPassword } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormSchema) => {
    if (!id || !code) {
      toast.error('Código ou ID inválidos');
      navigate('/login');
      return;
    }

    await resetPassword({ id, code, new_password: data.password });
  };

  return {
    isAuthenticated,
    navigate,
    handleSubmit,
    register,
    onSubmit,
    errors,
  };
}
