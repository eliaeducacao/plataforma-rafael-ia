import { useLocation } from 'wouter';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './login.schema';

export function useLoginModel() {
  const [, navigate] = useLocation();

  const { login, isLoginPending, isAuthenticated } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormSchema) => {
    await login({ email: data.email, password: data.password });
  };

  return {
    loading: isLoginPending,
    navigate,
    handleSubmit,
    register,
    onSubmit,
    errors,
    isAuthenticated,
  };
}
