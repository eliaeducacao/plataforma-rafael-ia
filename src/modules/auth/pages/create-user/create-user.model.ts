import { useLocation, useSearch } from 'wouter';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './create-user.schema';
import { toast } from 'sonner';

export function useCreateUserModel() {
  const [, navigate] = useLocation();
  const { isAuthenticated, resetPassword } = useAuth();
  const search = useSearch();

  // Extrair parâmetros da query string
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const code = params.get('code');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  console.log('Esses são os parâmetros: ', id, code);

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
