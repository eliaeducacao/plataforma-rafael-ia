import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { AuthContextType, AuthState, User } from '@/modules/auth/types';
import { navigate } from 'wouter/use-browser-location';
import { toast } from 'sonner';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session', session);
      if (session?.user) {
        setState({
          isAuthenticated: true,
          user: session.user as User,
          loading: false,
          error: null,
        });
      } else {
        setState({ ...initialState, loading: false });
      }
    });

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setState({
          isAuthenticated: true,
          user: session.user as User,
          loading: false,
          error: null,
        });
      } else {
        setState({ ...initialState, loading: false });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true,
          data: {
            email: email,
            avatar_url: 'https://ui-avatars.com/api/?name=' + email,
          },
        },
      });

      console.log('data', data);
      console.log('error', error);

      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
      }));
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer logout',
      }));
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao verificar código',
      }));
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/login');
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 