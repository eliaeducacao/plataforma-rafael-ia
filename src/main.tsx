import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Route, Switch } from 'wouter';

import './index.css';

import HomePage from '@/modules/home/pages/home';
import { LoginPage } from '@/modules/auth/pages/login';
import { AuthProvider } from '@/modules/auth/context/auth-context';
import { ProtectedRoute } from '@/modules/auth/components/protected-route';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> 
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/auth/callback">
        <ProtectedRoute>
          <div>Verificando autenticação...</div>
        </ProtectedRoute>
      </Route>,
    </Switch>
    </AuthProvider>
  </StrictMode>
);
