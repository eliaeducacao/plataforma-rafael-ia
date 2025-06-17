import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Route, Switch } from 'wouter';

import './index.css';

import HomePage from '@/modules/home/pages/home';
import { LoginPage } from '@/modules/auth/pages/login';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/auth/callback">
          <div>Verificando autenticação...</div>
      </Route>,
    </Switch>
  </StrictMode>
);
