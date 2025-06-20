import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Route, Switch } from 'wouter';

import { Toaster } from 'sonner';

import '@/index.css';

import HomePage from '@/modules/home/pages/home';
import LoginPage from '@/modules/auth/pages/login';
import ChatPage from '@/modules/chat/pages';
import AgentsPage from '@/modules/agents-library/pages';

import { ProtectedRoute } from '@/modules/auth/components/protected-route';
import { AuthProvider } from '@/modules/auth/providers/auth-provider';

import { CookiesProvider } from "react-cookie"

import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{
      path: '/',
      secure: true,
      sameSite: 'strict'
    }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster position='top-center' duration={3000} richColors />
          <Switch>
            {/* Rotas Públicas */}
            <Route path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/auth/callback">
              <div>Verificando autenticação...</div>
            </Route>

            {/* Rotas Privadas */}
            <ProtectedRoute>
              <Route path="/chats" component={ChatPage} />
              <Route path="/agents" component={AgentsPage} />
            </ProtectedRoute>
          </Switch>
        </AuthProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>
);
