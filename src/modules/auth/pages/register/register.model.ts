import { useLocation } from 'wouter';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './register.schema';

export function useRegisterModel() {
  const [, navigate] = useLocation();

  const { register: registerUser, isRegisterPending } = useAuth();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    await registerUser({ 
      name: data.name, 
      email: data.email, 
      password: data.password 
    });
  };

  return {
    loading: isRegisterPending,
    navigate,
    handleSubmit,
    register,
    control,
    onSubmit,
    errors,
  };
}

