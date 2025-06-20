import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './login.schema';

export function useLoginModel() {
  const [loading] = useState(false);
  const [isAuthenticated] = useState(false);
  const [, setLocation] = useLocation();

  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormSchema) => {
    await login(data.email).catch(() =>
      setError('email', { message: 'Esse não é um e-mail de estudante.' })
    );
  };

  return {
    loading,
    isAuthenticated,
    setLocation,
    handleSubmit,
    register,
    onSubmit,
    errors,
  };
}
