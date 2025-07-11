import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './email-to-reset-pass.schema';

export function useEmailToResetPassModel() {
  const { sendEmailToResetPassword, isAuthenticated } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormSchema) => {
    await sendEmailToResetPassword({ email: data.email });
  };

  return {
    isAuthenticated,
    handleSubmit,
    register,
    onSubmit,
    errors,
  };
}
